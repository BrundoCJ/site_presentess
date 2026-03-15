import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'
import { timingSafeEqual } from 'crypto'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const MAX_ATTEMPTS = 5
const LOCKOUT_SECONDS = 900 // 15 minutos

function getClientIP(req: Request): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    'unknown'
  )
}

async function checkRateLimit(ip: string): Promise<{ allowed: boolean; remaining: number }> {
  const key = `admin_attempts:${ip}`
  const attempts = await redis.incr(key)
  if (attempts === 1) await redis.expire(key, LOCKOUT_SECONDS)
  return { allowed: attempts <= MAX_ATTEMPTS, remaining: Math.max(0, MAX_ATTEMPTS - attempts) }
}

async function resetRateLimit(ip: string) {
  await redis.del(`admin_attempts:${ip}`)
}

function isAuthorized(req: Request): boolean {
  const authHeader = req.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) return false
  const provided = authHeader.slice(7)
  const expected = process.env.ADMIN_PASSWORD
  if (!expected || !provided) return false
  try {
    const bufA = Buffer.from(provided)
    const bufB = Buffer.from(expected)
    if (bufA.length !== bufB.length) {
      timingSafeEqual(Buffer.alloc(1), Buffer.alloc(1)) // evita leak de timing por tamanho
      return false
    }
    return timingSafeEqual(bufA, bufB)
  } catch {
    return false
  }
}

export async function GET(req: Request) {
  const ip = getClientIP(req)
  const { allowed, remaining } = await checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
      { status: 429 }
    )
  }

  if (!isAuthorized(req)) {
    return NextResponse.json(
      { error: 'Não autorizado.', remaining },
      { status: 401 }
    )
  }

  await resetRateLimit(ip)

  const raw = await redis.lrange('access_logs', 0, 499)
  const logs = raw.map((entry) =>
    typeof entry === 'string' ? JSON.parse(entry) : entry
  )

  return NextResponse.json({ logs })
}

export async function DELETE(req: Request) {
  const ip = getClientIP(req)
  const { allowed } = await checkRateLimit(ip)

  if (!allowed) {
    return NextResponse.json(
      { error: 'Muitas tentativas. Tente novamente em 15 minutos.' },
      { status: 429 }
    )
  }

  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Não autorizado.' }, { status: 401 })
  }

  await resetRateLimit(ip)
  await redis.del('access_logs')
  return NextResponse.json({ ok: true })
}
