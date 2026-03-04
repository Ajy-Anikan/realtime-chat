'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) setError(data.error)
    else router.push('/login')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAF8', fontFamily: 'sans-serif' }}>
      <div style={{ width: 360, padding: 40, background: 'white', border: '1px solid #E8E6E1' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Create account</h1>
        <p style={{ color: '#888', marginBottom: 32 }}>Start chatting in seconds</p>
        {error && <p style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Name</label>
            <input type="text" value={name} onChange={e => setName(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #E8E6E1', fontSize: 15, outline: 'none' }}
              placeholder="Your name" required />
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #E8E6E1', fontSize: 15, outline: 'none' }}
              placeholder="you@example.com" required />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, marginBottom: 6 }}>Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #E8E6E1', fontSize: 15, outline: 'none' }}
              placeholder="••••••••" required />
          </div>
          <button type="submit" disabled={loading}
            style={{ width: '100%', padding: '12px', background: '#1C1917', color: 'white', border: 'none', fontSize: 15, cursor: 'pointer' }}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>
        </form>
        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#888' }}>
          Have an account? <Link href="/login" style={{ color: '#1C1917', fontWeight: 600 }}>Sign in</Link>
        </p>
      </div>
    </div>
  )
}