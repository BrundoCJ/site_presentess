import { NextResponse } from 'next/server'
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

function isAuthorized(req: Request): boolean {
  const { searchParams } = new URL(req.url)
  const password = searchParams.get('password')
  return !!process.env.ADMIN_PASSWORD && password === process.env.ADMIN_PASSWORD
}

export async function GET(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  const raw = await redis.lrange('access_logs', 0, 499)
  const logs = raw.map((entry) =>
    typeof entry === 'string' ? JSON.parse(entry) : entry
  )

  return NextResponse.json({ logs })
}

export async function DELETE(req: Request) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 })
  }

  await redis.del('access_logs')
  return NextResponse.json({ ok: true })
}
