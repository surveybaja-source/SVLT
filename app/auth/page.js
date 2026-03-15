'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  const handleRegister = async () => {
    setLoading(true)
    setError(null)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) setError(error.message)
    else router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'#0c1a27',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#132030',border:'1px solid #1e3a52',borderRadius:12,padding:32,width:380}}>
        <h2 style={{color:'#fff',fontFamily:'sans-serif',marginBottom:24}}>SurveyLink</h2>
        {error && <p style={{color:'#dd2e1e',fontSize:13,marginBottom:12}}>{error}</p>}
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
          style={{width:'100%',background:'#0f1e2e',border:'1px solid #1e3a52',borderRadius:6,padding:'10px 14px',color:'#fff',marginBottom:12,boxSizing:'border-box'}}/>
        <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)}
          style={{width:'100%',background:'#0f1e2e',border:'1px solid #1e3a52',borderRadius:6,padding:'10px 14px',color:'#fff',marginBottom:16,boxSizing:'border-box'}}/>
        <button onClick={handleLogin} disabled={loading}
          style={{width:'100%',background:'#dd2e1e',color:'#fff',border:'none',borderRadius:7,padding:'11px',marginBottom:8,cursor:'pointer',fontWeight:700}}>
          {loading ? 'Chargement...' : 'Se connecter'}
        </button>
        <button onClick={handleRegister} disabled={loading}
          style={{width:'100%',background:'transparent',color:'#8fa8c0',border:'1px solid #1e3a52',borderRadius:7,padding:'11px',cursor:'pointer'}}>
          Créer un compte
        </button>
      </div>
    </div>
  )
}
