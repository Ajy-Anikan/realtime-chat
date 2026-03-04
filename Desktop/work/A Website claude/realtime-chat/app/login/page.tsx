'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    const res = await signIn('credentials', {
      email, password, redirect: false,
    })
    setLoading(false)
    if (res?.error) setError('Invalid email or password')
    else router.push('/chat')
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#FAFAF8', fontFamily: 'sans-serif' }}>
      <div style={{ width: 360, padding: 40, background: 'white', border: '1px solid #E8E6E1' }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>Welcome back</h1>
        <p style={{ color: '#888', marginBottom: 32 }}>Sign in to your account</p>
        {error && <p style={{ color: 'red', marginBottom: 16, fontSize: 14 }}>{error}</p>}
        <form onSubmit={handleSubmit}>
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
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p style={{ marginTop: 24, textAlign: 'center', fontSize: 14, color: '#888' }}>
          No account? <Link href="/register" style={{ color: '#1C1917', fontWeight: 600 }}>Register</Link>
        </p>
      </div>
    </div>
  )
}