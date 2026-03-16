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
      if (!user) { router.push('/auth'); return }
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

  if (!user || !role) return (
    <div style={{background:'#0c1a27',minHeight:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
      <p style={{color:'#8fa8c0'}}>Chargement...</p>
    </div>
  )

  if (role === 'insurer') return <InsurerDashboard user={user}/>
  return <ExpertDashboard user={user}/>
}

function InsurerDashboard({user}) {
  const router = useRouter()
  return (
    <div style={{background:'#0c1a27',minHeight:'100vh'}}>
      <nav style={{background:'#0f1e2e',borderBottom:'1px solid #1e3a52',padding:'0 32px',height:58,display:'flex',alignItems:'center',justifyContent:'space-between',position:'sticky',top:0,zIndex:100}}>
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <span style={{color:'#fff',fontWeight:900,fontSize:22,fontFamily:'sans-serif'}}>Survey<span style={{color:'#dd2e1e'}}>Link</span></span>
          <div style={{display:'flex',gap:8}}>
            {['Dashboard','+ Nouvelle Demande','Historique'].map(item=>(
              <button key={item} style={{background:'transparent',color:'#8fa8c0',border:'1px solid #1e3a52',borderRadius:6,padding:'6px 14px',fontSize:12,cursor:'pointer',fontFamily:'sans-serif'}}>
                {item}
              </button>
            ))}
          </div>
        </div>
        <button onClick={()=>supabase.auth.signOut().then(()=>router.push('/auth'))}
          style={{background:'transparent',color:'#8fa8c0',border:'1px solid #1e3a52',borderRadius:6,padding:'6px 16px',cursor:'pointer'}}>
          Se déconnecter
        </button>
      </nav>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'32px 24px'}}>
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:16,marginBottom:32}}>
          {[['Demandes Actives','3','2 en attente de quotes','#f0a500'],
            ['Réseau Experts','48','dans 12 pays','#5a9eff'],
            ['Temps Moyen','23m','30 derniers jours','#2e7d32'],
            ['Total du Mois','€41k','coûts expertise','#8fa8c0']
          ].map(([label,val,sub,color])=>(
            <div key={label} style={{background:'#132030',border:'1px solid #1e3a52',borderRadius:12,padding:'16px 20px'}}>
              <div style={{color:'#8fa8c0',fontSize:10,fontWeight:700,letterSpacing:'0.1em',textTransform:'uppercase',marginBottom:6}}>{label}</div>
              <div style={{color,fontSize:26,fontWeight:800,fontFamily:'sans-serif'}}>{val}</div>
              <div style={{color:'#4a6880',fontSize:11,marginTop:4}}>{sub}</div>
            </div>
          ))}
        </div>
        <h2 style={{color:'#fff',fontSize:22,fontWeight:800,marginBottom:16,fontFamily:'sans-serif'}}>Demandes Actives</h2>
        {[
          {id:'SL-2024-0892',cargo:'Container FCL',damage:'Water damage',client:'Maersk Line Ltd.',urgency:'urgent',status:'Quotes reçus',location:'Port of Rotterdam — Terminal
