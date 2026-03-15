'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function AuthPage() {
  const [mode, setMode] = useState('login')
  const [role, setRole] = useState(null)
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
    if (!role) { setError('Veuillez choisir un rôle'); return }
    setLoading(true)
    setError(null)
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) { setError(error.message); setLoading(false); return }
    await supabase.from('profiles').insert({ id: data.user.id, email, role })
    router.push('/dashboard')
    setLoading(false)
  }

  return (
    <div style={{minHeight:'100vh',background:'#0c1a27',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <div style={{background:'#132030',border:'1px solid #1e3a52',borderRadius:12,padding:32,width:400}}>
        <h2 style={{color:'#fff',fontFamily:'sans-serif',marginBottom:4,fontSize:26,fontWeight:900}}>
          Survey<span style={{color:'#dd2e1e'}}>Link</span>
        </h2>
        <p style={{color:'#4a6880',fontSize:11,marginBottom:24}}>Marine Cargo Survey Platform</p>

        {mode === 'login' ? <>
          <p style={{color:'#8
