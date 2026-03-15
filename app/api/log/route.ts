import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

const RATE_LIMIT = 30 // máx requisições por minuto por IP
const RATE_WINDOW = 60

async function isRateLimited(ip: string): Promise<boolean> {
  const key = `log_rate:${ip}`
  const count = await redis.incr(key)
  if (count === 1) await redis.expire(key, RATE_WINDOW)
  return count > RATE_LIMIT
}

function isValidString(val: unknown, maxLen: number): boolean {
  return typeof val === 'string' && val.length <= maxLen
}

export async function POST(req: Request) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      req.headers.get('x-real-ip') ||
      'unknown'

    if (await isRateLimited(ip)) {
      return NextResponse.json({ ok: false }, { status: 429 })
    }

    // Rejeita payloads grandes
    const contentLength = req.headers.get('content-length')
    if (contentLength && parseInt(contentLength) > 2048) {
      return NextResponse.json({ ok: false }, { status: 413 })
    }

    const data = await req.json()

    // Valida e sanitiza campos
    if (
      !isValidString(data.path, 200) ||
      !isValidString(data.userAgent, 300) ||
      !isValidString(data.timestamp, 50)
    ) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const logEntry = {
      timestamp: data.timestamp,
      path: data.path,
      ip,
      userAgent: data.userAgent,
      referrer: isValidString(data.referrer, 300) ? data.referrer : '',
      screenSize: isValidString(data.screenSize, 20) ? data.screenSize : '',
    }

    await redis.lpush('access_logs', JSON.stringify(logEntry))
    await redis.ltrim('access_logs', 0, 999)

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
