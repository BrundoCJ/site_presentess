'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

export function AccessLogger() {
  const pathname = usePathname()

  useEffect(() => {
    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        path: pathname,
        referrer: document.referrer || 'direct',
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString(),
        screenSize: `${window.screen.width}x${window.screen.height}`,
      }),
    }).catch(() => {})
  }, [pathname])

  return null
}
