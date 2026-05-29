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
            La Fe<br /><em>sin subestimar</em>
          </h1>
          <p className="dia-uno-subtitle">“Una meditación sobre la fe: certeza de lo que se espera, la convicción de lo que no se ve”</p>

          <div className="dia-uno-divider">
            <div className="dia-uno-divider-line" />
            <span className="dia-uno-divider-ornament">✦</span>
            <div className="dia-uno-divider-line" style={{ background: 'linear-gradient(270deg, var(--bark-light), transparent)' }} />
          </div>
        </div>

        {/* Versículo */}
        <div className="dia-uno-verse-card fade-up delay-3">
          <p className="dia-uno-verse-text">
            Una mujer de la multitud hacía doce años que sufría una hemorragia continua. Había sufrido mucho con varios médicos y, a lo largo de los años, había gastado todo lo que tenía para poder pagarles, pero nunca mejoró. De hecho, se puso peor. Marcos 5:25-26
          </p>
          <span className="dia-uno-verse-ref">Hebreos 11:1</span>
        </div>

        {/* Cuerpo */}
        <div className="fade-up delay-4">
          <p className="dia-uno-section-label">Reflexión</p>

          <p className="dia-uno-body-text">
            Ella había oído de Jesús, así que se acercó por detrás entre la multitud y 
            tocó su túnica. Pues pensó: Si tan solo tocara su túnica, quedaría sana. 
            Al instante, la hemorragia se detuvo, y ella pudo sentir en su cuerpo que había 
            sido sanada de su terrible condición. Marcos 5:27-29.
          </p>

          <p className="dia-uno-body-text">
            La mujer estuvo bajo una condición por años la cual los médicos no encontraban cura, 
            sin embargo, esto no fue un impedimento para que ella tuviera la certeza y convicción 
            de que podía ser sanada, aún sin haber visto a Jesús solo escuchó sobré él, ella confió 
            y creyó tanto que tenía la seguridad plena y genuina de que tan solo tocando el BORDE DE 
            SU TÚNICA, ella quedaría completamente sana, tal y como sucedió.
          </p>

          <div className="dia-uno-pull-quote">
            <p>
              “Jehová se especializa en lo imposible”
            </p>
          </div>

          <p className="dia-uno-body-text">
            En cuántas situaciones hemos dudado del poder de Dios al enfrentarnos con un problema que 
            vemos de gran magnitud en nuestras vidas, dejando al lado las promesas fieles del Señor. Es 
            aquí donde debemos tener la fe firme y confianza en Él.
          </p>
        </div>

        {/* Preguntas de reflexión */}
        <div className="dia-uno-reflection fade-up delay-5">
          <h3 className="dia-uno-reflection-title">Para meditar hoy</h3>

          {[
            'Reconoce en cual situación actual de tu vida necesitas reforzar la fe.',
            'Empieza a buscar más de su presencia leyendo la palabra para que tengas una dirección.',
            'Ten siempre presente que bienaventurados son los que creen aún sin ver.'
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