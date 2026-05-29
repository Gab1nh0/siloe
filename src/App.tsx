import './App.css'
import { useState } from 'react'
import DiaUno from './diaUno'

function App() {

  const [pantalla, setPantalla] = useState<'home' | 'diaUno'>('home')

  if (pantalla === 'diaUno') {
    return <DiaUno onBack={() => setPantalla('home')} />
  }
  
  return (
    <div style={{ backgroundColor: 'var(--color-cream)', minHeight: '100vh', padding: '0' }}>

      {/* Fondo decorativo */}
      <div style={{
        position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 80% 10%, rgba(184,149,106,0.12) 0%, transparent 60%), radial-gradient(ellipse at 10% 90%, rgba(184,149,106,0.08) 0%, transparent 50%)'
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px', margin: '0 auto', padding: '0 24px 48px' }}>

        {/* NAVBAR */}
        <nav className="fade-up delay-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '52px', paddingBottom: '8px' }}>
          <div>
            <div className="dot-ornament" style={{ marginBottom: '8px' }} />
            <h1 className="font-display" style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '0.02em' }}>
              Siloé
            </h1>
          </div>

        </nav>

        {/* Línea divisora */}
        <div className="fade-up delay-1" style={{ height: '1px', background: 'linear-gradient(90deg, var(--color-bark-light), transparent)', margin: '16px 0 36px', opacity: 0.3 }} />

        {/* Encabezado */}
        <div className="fade-up delay-2" style={{ marginBottom: '32px' }}>
          <p style={{ fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-bark)', fontWeight: 500, marginBottom: '8px' }}>
            Serie actual
          </p>
          <h2 className="font-display" style={{ fontSize: '42px', fontWeight: 300, lineHeight: 1.1, color: 'var(--color-ink)', marginBottom: '12px' }}>
            Fundamentos
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.65, color: 'rgba(44,36,22,0.55)', fontWeight: 300 }}>
            Inicia tu camino en Siloé con esta serie de 7 días donde exploraremos juntos los fundamentos de la vida cristiana a través de reflexiones y actividades prácticas que te ayudarán a crecer en tu fe y amor por Dios.
          </p>

          {/* Progreso */}
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontSize: '12px', color: 'var(--color-bark)', fontWeight: 400 }}>Progreso</span>
              <span style={{ fontSize: '12px', color: 'var(--color-bark)', fontWeight: 500 }}>1 / 7</span>
            </div>
            <div style={{ background: 'rgba(139,111,71,0.15)', borderRadius: '2px', height: '3px' }}>
              <div className="progress-bar" style={{ width: '14%' }} />
            </div>
          </div>
        </div>

        {/* Lecciones */}
        <div className="fade-up delay-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>

          {/* Card activa */}
          <div className="card-lesson" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '46px', height: '46px', borderRadius: '14px', flexShrink: 0,
              background: 'linear-gradient(135deg, var(--color-bark), var(--color-bark-light))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: 'white', fontSize: '11px', letterSpacing: '0.05em', fontWeight: 500
            }}>
              01
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-bark-light)', fontWeight: 500, marginBottom: '3px' }}>
                Día 1
              </p>
              <h3 className="font-display" style={{ fontSize: '22px', fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.2 }}>
                La Fe Sin Subestimar
              </h3>
            </div>
            <div className="chevron-circle" onClick={() => setPantalla('diaUno')}
                style={{ cursor: 'pointer' }}>
              <span className="material-symbols-sharp" style={{ fontSize: '18px' }}>chevron_right</span>
            </div>
          </div>

          {/* Cards bloqueadas */}
          {['La Fe que Mueve', 'Paz en la Tormenta', 'El Amor que Permanece'].map((titulo, i) => (
            <div key={i} className="card-lesson" style={{ padding: '20px 22px', display: 'flex', alignItems: 'center', gap: '16px', opacity: 0.5 }}>
              <div style={{
                width: '46px', height: '46px', borderRadius: '14px', flexShrink: 0,
                border: '1.5px solid rgba(139,111,71,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'var(--color-bark)', fontSize: '11px', letterSpacing: '0.05em', fontWeight: 500
              }}>
                {String(i + 2).padStart(2, '0')}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-bark-light)', fontWeight: 500, marginBottom: '3px' }}>
                  Día {i + 2}
                </p>
                <h3 className="font-display" style={{ fontSize: '22px', fontWeight: 400, color: 'var(--color-ink)', lineHeight: 1.2 }}>
                  {titulo}
                </h3>
              </div>
              <span className="material-symbols-sharp" style={{ color: 'var(--color-bark-light)', fontSize: '18px' }}>lock</span>
            </div>
          ))}

        </div>
      </div>
    </div>
  )
}

export default App