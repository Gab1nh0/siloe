import { useState } from 'react'
import './diaUno.css'
import Puzzle from './puzzle'

interface DiaUnoProps {
  onBack?: () => void
}

function DiaUno({ onBack }: DiaUnoProps) {
  const [showPuzzle, setShowPuzzle] = useState(false)
  return (
    <div className="dia-uno-root">

      {/* Rompecabezas */}
      {showPuzzle && (
        <Puzzle
          onClose={() => setShowPuzzle(false)}
          onComplete={() => console.log('¡Puzzle completado!')}
        />
      )}

      {/* Fondo decorativo */}
      <div className="dia-uno-bg" />

      {/* Barra de progreso fija abajo */}
      <div className="dia-uno-progress-footer">
        <div className="dia-uno-progress-label">
          <span>Fundamentos · Día 1</span>
          <span>14%</span>
        </div>
        <div className="dia-uno-progress-track">
          <div className="dia-uno-progress-fill" />
        </div>
      </div>

      <div className="dia-uno-container">

        {/* Navbar */}
        <nav className="dia-uno-nav fade-up delay-1">
          <button className="dia-uno-back-btn" onClick={onBack}>
            <span className="material-symbols-sharp" style={{ fontSize: '18px' }}>chevron_backward</span>
          </button>
          <span className="dia-uno-nav-label">Fundamentos</span>
        </nav>

        {/* Hero */}
        <div className="dia-uno-hero fade-up delay-2">
          <div className="dia-uno-badge">
            <div className="dia-uno-badge-dot" />
            <span className="dia-uno-badge-text">Día 1 de 7</span>
          </div>

          <h1 className="dia-uno-title">
            Gracia<br /><em>Infinita</em>
          </h1>
          <p className="dia-uno-subtitle">Una meditación sobre el amor que no cesa</p>

          <div className="dia-uno-divider">
            <div className="dia-uno-divider-line" />
            <span className="dia-uno-divider-ornament">✦</span>
            <div className="dia-uno-divider-line" style={{ background: 'linear-gradient(270deg, var(--bark-light), transparent)' }} />
          </div>
        </div>

        {/* Versículo */}
        <div className="dia-uno-verse-card fade-up delay-3">
          <p className="dia-uno-verse-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <span className="dia-uno-verse-ref">Lorem 3:16 — versión de referencia</span>
        </div>

        {/* Cuerpo */}
        <div className="fade-up delay-4">
          <p className="dia-uno-section-label">Reflexión</p>

          <p className="dia-uno-body-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
            fugiat nulla pariatur.
          </p>

          <p className="dia-uno-body-text">
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
            deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus
            error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
          </p>

          <div className="dia-uno-pull-quote">
            <p>
              "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit,
              sed quia consequuntur magni dolores."
            </p>
          </div>

          <p className="dia-uno-body-text">
            Ut labore et dolore magnam aliquam quaerat voluptatem. Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur,
            vel illum qui dolorem eum fugiat quo voluptas nulla pariatur.
          </p>
        </div>

        {/* Preguntas de reflexión */}
        <div className="dia-uno-reflection fade-up delay-5">
          <h3 className="dia-uno-reflection-title">Para meditar hoy</h3>

          {[
            'Lorem ipsum dolor sit amet, quid de te ipse sentis?',
            'Ut enim ad minima veniam, quis vestrum exercitationem ullam corporis?',
            'Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet?',
          ].map((pregunta, i) => (
            <div className="dia-uno-reflection-item" key={i}>
              <span className="dia-uno-reflection-num">{i + 1}.</span>
              <p>{pregunta}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="dia-uno-cta fade-up delay-5">
          <button className="dia-uno-btn-primary" onClick={() => setShowPuzzle(true)}>
            <span className="material-symbols-sharp" style={{ fontSize: '18px' }}>check_small</span>
            Marcar como completado
          </button>
          <button className="dia-uno-btn-secondary">
            Guardar para después
          </button>
        </div>

      </div>
    </div>
  )
}

export default DiaUno