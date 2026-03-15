'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push('/auth')
        return
      }
      setUser(user)
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single()
      if (profile) setRole(profile.role)
else setRole('insurer')
    }
    getUser()
  }, [])

  if (!user) return <div style={{background:'#0c1a27',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}><p style={{color:'#8fa8c0'}}>Chargement...</p></div>

  return (
    <div style={{background:'#0c1a27',minHeight:'100vh'}}>
      <div style={{background:'#0f1e2e',borderBottom:'1px solid #1e3a52',padding:'0 32px',height:58,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{color:'#fff',fontFamily:'sans-serif',fontWeight:900,fontSize:22}}>Survey<span style={{color:'#dd2e1e'}}>Link</span></span>
        <button onClick={()=>supabase.auth.signOut().then(()=>router.push('/auth'))}
          style={{background:'transparent',color:'#8fa8c0',border:'1px solid #1e3a52',borderRadius:6,padding:'6px 16px',cursor:'pointer'}}>
          Se déconnecter
        </button>
      </div>
      <div style={{maxWidth:800,margin:'60px auto',padding:'0 24px',textAlign:'center'}}>
        <h1 style={{color:'#fff',fontFamily:'sans-serif',fontSize:32,marginBottom:16}}>
          Bienvenue sur SurveyLink
        </h1>
        <p style={{color:'#8fa8c0',fontSize:16,marginBottom:32}}>
          {role === 'insurer' ? '🏢 Portail Insurer' : role === 'expert' ? '🔍 Portail Surveyor' : 'Chargement de votre profil...'}
        </p>
        <p style={{color:'#4a6880',fontSize:13}}>{user.email}</p>
      </div>
    </div>
  )
}
