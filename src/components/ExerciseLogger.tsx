import { Plus, Trash2, Clock } from 'lucide-react'
import type { Exercise, LoggedExercise } from '../types'

interface Props {
  exercise: Exercise
  logged: LoggedExercise
  lastTime: LoggedExercise | null
  onChange: (updated: LoggedExercise) => void
}

export default function ExerciseLogger({ exercise, logged, lastTime, onChange }: Props) {
  const updateSet = (index: number, field: 'weight' | 'reps', raw: string) => {
    const val = raw === '' ? 0 : parseFloat(raw)
    const sets = logged.sets.map((s, i) =>
      i === index ? { ...s, [field]: isNaN(val) ? 0 : val } : s
    )
    onChange({ ...logged, sets })
  }

  const addSet = () => {
    const last = logged.sets[logged.sets.length - 1]
    onChange({
      ...logged,
      sets: [...logged.sets, { weight: last?.weight ?? 0, reps: last?.reps ?? exercise.defaultReps }],
    })
  }

  const removeSet = (index: number) => {
    if (logged.sets.length <= 1) return
    onChange({ ...logged, sets: logged.sets.filter((_, i) => i !== index) })
  }

  return (
    <div
      className="rounded-2xl overflow-hidden"
      style={{
        background: '#1e1e2e',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 2px 12px rgba(0,0,0,0.35)',
      }}
    >
      {/* Exercise header */}
      <div className="px-4 pt-4 pb-3">
        <h3 className="text-base font-bold text-white tracking-tight">{exercise.name}</h3>

        {/* Last time reference */}
        {lastTime && lastTime.sets.length > 0 && (
          <div
            className="mt-2 rounded-xl px-3 py-2.5 flex items-start gap-2"
            style={{ background: 'rgba(99,102,241,0.10)', border: '1px solid rgba(99,102,241,0.2)' }}
          >
            <Clock size={13} className="text-indigo-400 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest mb-1.5">
                Last Session
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {lastTime.sets.map((s, i) => (
                  <span key={i} className="text-xs text-indigo-300 font-medium">
                    {s.weight > 0 ? `${s.weight}kg` : '—'} × {s.reps}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Column headers */}
      <div className="grid grid-cols-[40px_1fr_1fr_36px] gap-2 px-4 pb-1.5">
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Set</span>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Weight (kg)</span>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest text-center">Reps</span>
        <span />
      </div>

      {/* Set rows */}
      <div className="px-3 pb-2 flex flex-col gap-1.5">
        {logged.sets.map((set, i) => (
          <div
            key={i}
            className="grid grid-cols-[40px_1fr_1fr_36px] gap-2 items-center rounded-xl px-1 py-1"
            style={{ background: 'rgba(255,255,255,0.03)' }}
          >
            {/* Set number */}
            <div className="flex items-center justify-center">
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                style={{ background: '#252538', color: '#8b8ba5' }}
              >
                {i + 1}
              </span>
            </div>

            {/* Weight input */}
            <input
              type="number"
              inputMode="decimal"
              placeholder="0"
              value={set.weight === 0 ? '' : set.weight}
              onChange={e => updateSet(i, 'weight', e.target.value)}
              className="w-full rounded-xl text-center text-base font-bold text-white placeholder-gray-600 outline-none focus:ring-1 transition-all"
              style={{
                background: '#252538',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '10px 4px',
                minHeight: 48,
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.15)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />

            {/* Reps input */}
            <input
              type="number"
              inputMode="numeric"
              placeholder="0"
              value={set.reps === 0 ? '' : set.reps}
              onChange={e => updateSet(i, 'reps', e.target.value)}
              className="w-full rounded-xl text-center text-base font-bold text-white placeholder-gray-600 outline-none transition-all"
              style={{
                background: '#252538',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '10px 4px',
                minHeight: 48,
              }}
              onFocus={e => {
                e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'
                e.currentTarget.style.boxShadow = '0 0 0 2px rgba(99,102,241,0.15)'
              }}
              onBlur={e => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            />

            {/* Remove set */}
            <button
              onClick={() => removeSet(i)}
              disabled={logged.sets.length <= 1}
              className="w-9 h-9 flex items-center justify-center rounded-xl transition-all disabled:opacity-20"
              style={{ color: '#6b7280' }}
              onMouseEnter={e => { if (logged.sets.length > 1) e.currentTarget.style.color = '#f87171' }}
              onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Add set button */}
      <div className="px-3 pb-4">
        <button
          onClick={addSet}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all"
          style={{
            color: '#818cf8',
            background: 'rgba(99,102,241,0.08)',
            border: '1px dashed rgba(99,102,241,0.3)',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)' }}
        >
          <Plus size={14} />
          Add Set
        </button>
      </div>
    </div>
  )
}
