import { useState, useRef, useEffect, useCallback } from 'react'
import './Puzzle.css'

// ── Config ────────────────────────────────────────────────
const COLS = 3
const ROWS = 3
const TOTAL = COLS * ROWS

// Cambia esta URL por tu imagen cuando la tengas
const IMAGE_URL = 'https://res.cloudinary.com/dnvwjkcpj/image/upload/v1780080564/WhatsApp_Image_2026-05-29_at_1.15.26_PM_gwxeei.jpg'

// ── Helpers ───────────────────────────────────────────────
function createShuffled(): number[] {
  const arr = Array.from({ length: TOTAL }, (_, i) => i)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function isSolved(tiles: number[]): boolean {
  return tiles.every((v, i) => v === i)
}

// ── Componente principal ──────────────────────────────────
interface PuzzleProps {
  onClose: () => void
  onComplete?: () => void
}

export default function Puzzle({ onClose, onComplete }: PuzzleProps) {
  const [tiles, setTiles]         = useState<number[]>(createShuffled)
  const [moves, setMoves]         = useState(0)
  const [won, setWon]             = useState(false)
  const [showPreview, setPreview] = useState(false)

  // Drag state (funciona para mouse y touch)
  const dragFrom   = useRef<number | null>(null)   // índice en el board desde donde arrastras
  const dragOver   = useRef<number | null>(null)   // índice sobre el que estás
  const [dragging, setDragging] = useState<number | null>(null)
  const [hovering, setHovering] = useState<number | null>(null)

  // Cerrar con Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  const doSwap = useCallback((from: number, to: number) => {
    if (from === to) return
    setTiles(prev => {
      const next = [...prev]
      ;[next[from], next[to]] = [next[to], next[from]]
      setMoves(m => m + 1)
      if (isSolved(next)) setTimeout(() => { setWon(true); onComplete?.() }, 200)
      return next
    })
  }, [onComplete])

  // ── Mouse events ──────────────────────────────────────
  const onMouseDown = (idx: number) => {
    dragFrom.current = idx
    dragOver.current = idx
    setDragging(idx)
  }

  const onMouseEnter = (idx: number) => {
    if (dragFrom.current === null) return
    dragOver.current = idx
    setHovering(idx)
  }

  const onMouseUp = () => {
    if (dragFrom.current !== null && dragOver.current !== null) {
      doSwap(dragFrom.current, dragOver.current)
    }
    dragFrom.current = null
    dragOver.current = null
    setDragging(null)
    setHovering(null)
  }

  // ── Touch events ─────────────────────────────────────
  const boardRef = useRef<HTMLDivElement>(null)

  const onTouchStart = (idx: number) => {
    dragFrom.current = idx
    setDragging(idx)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    e.preventDefault()
    if (!boardRef.current || dragFrom.current === null) return
    const touch = e.touches[0]
    const el = document.elementFromPoint(touch.clientX, touch.clientY)
    const cell = el?.closest('[data-cell]') as HTMLElement | null
    if (cell) {
      const idx = parseInt(cell.dataset.cell!)
      dragOver.current = idx
      setHovering(idx)
    }
  }

  const onTouchEnd = () => {
    if (dragFrom.current !== null && dragOver.current !== null) {
      doSwap(dragFrom.current, dragOver.current)
    }
    dragFrom.current = null
    dragOver.current = null
    setDragging(null)
    setHovering(null)
  }

  const handleReset = () => {
    setTiles(createShuffled())
    setMoves(0)
    setWon(false)
  }

  return (
    <div
      className="puzzle-overlay"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
      onMouseUp={onMouseUp}
    >
      <div className="puzzle-modal">

        {/* Header */}
        <div className="puzzle-header">
          <div>
            <h2 className="puzzle-title">
              {won ? <>¡Lo <em>lograste!</em></> : <>Arma el <em>rompecabezas</em></>}
            </h2>
            <p className="puzzle-subtitle">
              {won
                ? 'Has completado el desafío del Día 1'
                : 'Arrastra las piezas para ordenar la imagen'}
            </p>
          </div>
          <button className="puzzle-close-btn" onClick={onClose} aria-label="Cerrar">
            <span className="material-symbols-sharp" style={{ fontSize: '16px' }}>close_small</span>
          </button>
        </div>

        {!won && (
          <div className="puzzle-meta">
            <div className="puzzle-moves">
              <span className="material-symbols-sharp puzzle-moves-icon">swipe_vertical</span>
              {moves} {moves === 1 ? 'movimiento' : 'movimientos'}
            </div>
            <button
              className="puzzle-preview-btn"
              onMouseDown={() => setPreview(true)}
              onMouseUp={() => setPreview(false)}
              onTouchStart={() => setPreview(true)}
              onTouchEnd={() => setPreview(false)}
            >
              Ver imagen
            </button>
          </div>
        )}

        {/* Tablero */}
        {!won && (
          <div className="puzzle-board-wrap">
            <div
              ref={boardRef}
              className="puzzle-board"
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {tiles.map((value, boardIdx) => {
                const srcCol = value % COLS
                const srcRow = Math.floor(value / COLS)
                const bgX = (srcCol / (COLS - 1)) * 100
                const bgY = (srcRow / (ROWS - 1)) * 100
                const isCorrect = value === boardIdx
                const isDragging = dragging === boardIdx
                const isTarget  = hovering === boardIdx && dragging !== null && dragging !== boardIdx

                return (
                  <div
                    key={boardIdx}
                    data-cell={boardIdx}
                    className={[
                      'puzzle-piece',
                      isCorrect  ? 'puzzle-piece--correct'  : '',
                      isDragging ? 'puzzle-piece--dragging' : '',
                      isTarget   ? 'puzzle-piece--target'   : '',
                    ].join(' ')}
                    style={{
                      backgroundImage: `url(${IMAGE_URL})`,
                      backgroundSize: `${COLS * 100}% ${ROWS * 100}%`,
                      backgroundPosition: `${bgX}% ${bgY}%`,
                    }}
                    onMouseDown={() => onMouseDown(boardIdx)}
                    onMouseEnter={() => onMouseEnter(boardIdx)}
                    onTouchStart={() => onTouchStart(boardIdx)}
                  />
                )
              })}
            </div>

            {showPreview && (
              <div className="puzzle-preview-overlay">
                <img src={IMAGE_URL} alt="Imagen completa" />
                <span className="puzzle-preview-label">Vista previa</span>
              </div>
            )}
          </div>
        )}

        {/* Estado ganador */}
        {won && (
          <div className="puzzle-win">
            <span className="material-symbols-sharp puzzle-win-icon">check_small</span>
            <h3 className="puzzle-win-title">¡Completado!</h3>
            <p className="puzzle-win-sub">Terminaste en {moves} movimientos</p>
            <button className="puzzle-btn" onClick={onClose}>
              <span className="material-symbols-sharp" style={{ fontSize: '16px' }}>check_small</span>
              Continuar
            </button>
            <button className="puzzle-btn puzzle-btn--secondary" onClick={handleReset}>
              Jugar de nuevo
            </button>
          </div>
        )}

        {!won && (
          <button className="puzzle-btn puzzle-btn--secondary" onClick={handleReset}>
            <span className="material-symbols-sharp" style={{ fontSize: '15px' }}>refresh</span>
            Reiniciar
          </button>
        )}

      </div>
    </div>
  )
}