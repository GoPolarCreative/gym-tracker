import { useLocalStorage } from '../hooks/useLocalStorage'
import SessionCard from '../components/SessionCard'
import type { SessionLog } from '../types'
import { BarChart2 } from 'lucide-react'

export default function Progress() {
  const [history, setHistory] = useLocalStorage<SessionLog[]>('sessionHistory', [])

  const deleteSession = (id: string) => {
    setHistory(prev => prev.filter(s => s.id !== id))
  }

  const totalSets = history.reduce(
    (a, s) => a + s.exercises.reduce((b, e) => b + e.sets.length, 0),
    0
  )

  return (
    <div className="px-4 pt-5 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white tracking-tight">Progress</h1>
        <p className="text-sm text-gray-500 mt-1">Your full session history</p>
      </div>

      {/* Stats row */}
      {history.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { label: 'Sessions', value: history.length },
            { label: 'Exercises', value: history.reduce((a, s) => a + s.exercises.length, 0) },
            { label: 'Total Sets', value: totalSets },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-2xl px-3 py-4 text-center"
              style={{
                background: '#1e1e2e',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-2xl font-black text-white">{value}</p>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {history.length === 0 ? (
        <div
          className="rounded-2xl px-6 py-16 text-center flex flex-col items-center gap-4"
          style={{ background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div
            className="w-16 h-16 rounded-2xl flex items-center justify-center"
            style={{ background: 'rgba(99,102,241,0.12)' }}
          >
            <BarChart2 size={28} className="text-indigo-400" />
          </div>
          <div>
            <p className="text-lg font-bold text-white mb-1">No sessions yet</p>
            <p className="text-sm text-gray-500 leading-relaxed">
              Log your first workout on the Today tab and it'll appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {/* Sessions newest first */}
          {[...history]
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .map(session => (
              <SessionCard
                key={session.id}
                session={session}
                onDelete={deleteSession}
              />
            ))
          }
        </div>
      )}
    </div>
  )
}
