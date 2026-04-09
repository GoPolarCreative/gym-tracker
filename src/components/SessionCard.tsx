import { useState } from 'react'
import { ChevronDown, ChevronUp, Trash2, CalendarDays } from 'lucide-react'
import type { SessionLog } from '../types'

interface Props {
  session: SessionLog
  onDelete: (id: string) => void
}

const DAY_COLOURS: Record<string, string> = {
  'Push Day':  '#f59e0b',
  'Pull Day':  '#3b82f6',
  'Leg Day':   '#10b981',
  'Arm Day':   '#ec4899',
  'Rest Day':  '#6b7280',
}

function tagColor(name: string) {
  for (const [key, val] of Object.entries(DAY_COLOURS)) {
    if (name.toLowerCase().includes(key.toLowerCase().split(' ')[0])) return val
  }
  return '#6366f1'
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}

function formatTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

export default function SessionCard({ session, onDelete }: Props) {
  const [expanded, setExpanded] = useState(false)
  const color = tagColor(session.workoutName)

  const handleDelete = () => {
    if (window.confirm(`Delete this session (${formatDate(session.date)})? This cannot be undone.`)) {
      onDelete(session.id)
    }
  }

  const totalSets = session.exercises.reduce((a, e) => a + e.sets.length, 0)

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#1e1e2e',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
      }}
    >
      {/* Card header */}
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Colour dot */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: `${color}22` }}
          >
            <CalendarDays size={18} style={{ color }} />
          </div>

          {/* Meta */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <span
                className="text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: `${color}22`, color }}
              >
                {session.workoutName}
              </span>
            </div>
            <p className="text-sm font-semibold text-white truncate">{formatDate(session.date)}</p>
            <p className="text-xs text-gray-500 mt-0.5">
              {formatTime(session.date)} · {session.exercises.length} exercises · {totalSets} sets
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={handleDelete}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-600 transition-all"
              onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.1)' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.background = 'transparent' }}
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={() => setExpanded(x => !x)}
              className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-500 transition-all"
              style={{ background: 'rgba(255,255,255,0.04)' }}
            >
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Expandable exercise breakdown */}
      {expanded && (
        <div
          className="px-4 pb-4 pt-1 flex flex-col gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
        >
          {session.exercises.map(ex => (
            <div key={ex.exerciseId}>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{ex.name}</p>
              <div className="flex flex-col gap-1">
                {ex.sets.map((s, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-lg px-3 py-2"
                    style={{ background: 'rgba(255,255,255,0.03)' }}
                  >
                    <span
                      className="w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold shrink-0"
                      style={{ background: '#252538', color: '#6b7280' }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-sm font-semibold text-white">
                      {s.weight > 0 ? `${s.weight} kg` : '—'}
                    </span>
                    <span className="text-gray-600 text-xs">×</span>
                    <span className="text-sm font-semibold text-white">{s.reps} reps</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
