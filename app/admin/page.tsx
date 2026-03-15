'use client'

import { useState, useEffect, useCallback } from 'react'

type LogEntry = {
  timestamp: string
  path: string
  ip: string
  userAgent: string
  referrer: string
  screenSize?: string
}

type Stats = {
  total: number
  uniqueIPs: number
  ipList: { ip: string; count: number }[]
  mostVisited: { path: string; count: number }[]
}

function computeStats(logs: LogEntry[]): Stats {
  const ipCount: Record<string, number> = {}
  const pathCount: Record<string, number> = {}
  for (const log of logs) {
    ipCount[log.ip] = (ipCount[log.ip] || 0) + 1
    pathCount[log.path] = (pathCount[log.path] || 0) + 1
  }
  const ipList = Object.entries(ipCount)
    .sort((a, b) => b[1] - a[1])
    .map(([ip, count]) => ({ ip, count }))
  const mostVisited = Object.entries(pathCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([path, count]) => ({ path, count }))

  return { total: logs.length, uniqueIPs: ipList.length, ipList, mostVisited }
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  } catch {
    return iso
  }
}

function shortUA(ua: string) {
  if (ua.includes('iPhone') || ua.includes('Android')) return '📱 Mobile'
  if (ua.includes('iPad')) return '📱 Tablet'
  if (ua.includes('Chrome')) return '🌐 Chrome'
  if (ua.includes('Firefox')) return '🦊 Firefox'
  if (ua.includes('Safari')) return '🧭 Safari'
  return '🌐 Browser'
}

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [savedPassword, setSavedPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [cleared, setCleared] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [locked, setLocked] = useState(false)

  const fetchLogs = useCallback(async (pwd: string) => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/logs', {
        headers: { 'Authorization': `Bearer ${pwd}` },
      })
      if (res.ok) {
        const data = await res.json()
        setLogs(data.logs)
        setStats(computeStats(data.logs))
        setAuthenticated(true)
        setAttempts(0)
        sessionStorage.setItem('admin_token', btoa(pwd))
      } else if (res.status === 429) {
        setLocked(true)
        setError('Conta bloqueada por muitas tentativas. Tente em 15 minutos.')
      } else {
        const data = await res.json().catch(() => ({}))
        const remaining = data.remaining ?? ''
        setAttempts((prev) => prev + 1)
        setError(`Senha incorreta.${remaining !== '' ? ` Tentativas restantes: ${remaining}` : ''}`)
      }
    } catch {
      setError('Erro ao conectar. Verifique as variáveis de ambiente.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const stored = sessionStorage.getItem('admin_token')
    if (stored) {
      try {
        const pwd = atob(stored)
        setSavedPassword(pwd)
        fetchLogs(pwd)
      } catch {
        sessionStorage.removeItem('admin_token')
      }
    }
  }, [fetchLogs])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    fetchLogs(password)
    setSavedPassword(password)
  }

  const handleClear = async () => {
    if (!confirm('Apagar todos os logs?')) return
    await fetch('/api/logs', {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${savedPassword}` },
    })
    setLogs([])
    setStats(computeStats([]))
    setCleared(true)
  }

  const handleLogout = () => {
    sessionStorage.removeItem('admin_token')
    setAuthenticated(false)
    setPassword('')
    setSavedPassword('')
    setLogs([])
    setStats(null)
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <form
          onSubmit={handleLogin}
          className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 w-full max-w-sm flex flex-col gap-4"
        >
          <h1 className="text-white text-xl font-semibold text-center">Admin</h1>
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-zinc-800 text-white rounded-lg px-4 py-3 outline-none border border-zinc-700 focus:border-zinc-500 transition"
            autoFocus
            disabled={locked}
          />
          {error && <p className="text-red-400 text-sm text-center">{error}</p>}
          {attempts >= 3 && !locked && (
            <p className="text-yellow-500 text-xs text-center">
              Atenção: após 5 tentativas incorretas o acesso será bloqueado por 15 minutos.
            </p>
          )}
          <button
            type="submit"
            disabled={loading || locked}
            className="bg-white text-black rounded-lg px-4 py-3 font-semibold hover:bg-zinc-200 transition disabled:opacity-50"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Logs de Acesso</h1>
          <div className="flex gap-3">
            <button
              onClick={() => fetchLogs(savedPassword)}
              className="bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg px-4 py-2 text-sm transition"
            >
              Atualizar
            </button>
            <button
              onClick={handleClear}
              className="bg-red-900 hover:bg-red-800 text-white rounded-lg px-4 py-2 text-sm transition"
            >
              Limpar logs
            </button>
            <button
              onClick={handleLogout}
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-lg px-4 py-2 text-sm transition"
            >
              Sair
            </button>
          </div>
        </div>

        {/* Stats */}
        {stats && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-zinc-400 text-xs mb-1">Total de visitas</p>
                <p className="text-3xl font-bold">{stats.total}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <p className="text-zinc-400 text-xs mb-1">IPs únicos</p>
                <p className="text-3xl font-bold">{stats.uniqueIPs}</p>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 col-span-2">
                <p className="text-zinc-400 text-xs mb-2">Páginas mais visitadas</p>
                <ul className="space-y-1">
                  {stats.mostVisited.map(({ path, count }) => (
                    <li key={path} className="flex justify-between text-sm">
                      <span className="text-zinc-300 truncate">{path || '/'}</span>
                      <span className="text-zinc-500 ml-2">{count}x</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-8">
              <p className="text-zinc-400 text-xs mb-3">IPs que acessaram ({stats.uniqueIPs})</p>
              <div className="flex flex-wrap gap-2">
                {stats.ipList.map(({ ip, count }) => (
                  <span
                    key={ip}
                    className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1 text-xs font-mono text-zinc-300 flex items-center gap-2"
                  >
                    {ip}
                    <span className="text-zinc-500">{count}x</span>
                  </span>
                ))}
              </div>
            </div>
          </>
        )}

        {cleared && (
          <p className="text-green-400 text-sm mb-4">Logs apagados com sucesso.</p>
        )}

        {/* Table */}
        {logs.length === 0 ? (
          <div className="text-center text-zinc-500 py-20">Nenhum log encontrado.</div>
        ) : (
          <div className="overflow-x-auto rounded-xl border border-zinc-800">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-zinc-900 text-zinc-400 text-left">
                  <th className="px-4 py-3 font-medium">Data/Hora</th>
                  <th className="px-4 py-3 font-medium">Página</th>
                  <th className="px-4 py-3 font-medium">IP</th>
                  <th className="px-4 py-3 font-medium">Dispositivo</th>
                  <th className="px-4 py-3 font-medium">Referência</th>
                  <th className="px-4 py-3 font-medium">Tela</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log, i) => (
                  <tr
                    key={i}
                    className="border-t border-zinc-800 hover:bg-zinc-900/50 transition"
                  >
                    <td className="px-4 py-3 text-zinc-300 whitespace-nowrap">
                      {formatDate(log.timestamp)}
                    </td>
                    <td className="px-4 py-3 text-white font-mono">{log.path || '/'}</td>
                    <td className="px-4 py-3 text-zinc-400 font-mono">{log.ip}</td>
                    <td className="px-4 py-3 text-zinc-300">{shortUA(log.userAgent)}</td>
                    <td className="px-4 py-3 text-zinc-500 truncate max-w-xs">
                      {log.referrer}
                    </td>
                    <td className="px-4 py-3 text-zinc-500">{log.screenSize || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
