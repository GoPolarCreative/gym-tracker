import { useState, useEffect, useCallback } from 'react'
import { CheckCircle2, ChevronDown } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ExerciseLogger from '../components/ExerciseLogger'
import { DEFAULT_PLANS } from '../data/defaults'
import type { DayOfWeek, WorkoutPlans, SessionLog, LoggedExercise } from '../types'

const DAYS: DayOfWeek[] = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

function todayDOW(): DayOfWeek {
  const js = new Date().getDay() // 0=Sun
  const idx = js === 0 ? 6 : js - 1
  return DAYS[idx]
}

function formatHeader(): string {
  return new Date().toLocaleDateString('en-GB', {
    weekday: 'long', day: 'numeric', month: 'long',
  })
}

export default function Today() {
  const [plans]           = useLocalStorage<WorkoutPlans>('workoutPlans', DEFAULT_PLANS)
  const [history, setHistory] = useLocalStorage<SessionLog[]>('sessionHistory', [])

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>(todayDOW())
  const [sessionData, setSessionData] = useState<LoggedExercise[]>([])
  const [saved, setSaved] = useState(false)

  // Find the most recent logged session for a given exerciseId
  const getLastTime = useCallback(
    (exerciseId: string): LoggedExercise | null => {
      const sorted = [...history].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      )
      for (const session of sorted) {
        const found = session.exercises.find(e => e.exerciseId === exerciseId)
        if (found) return found
      }
      return null
    },
    [history]
  )

  // Initialise session when day changes
  useEffect(() => {
    const plan = plans[selectedDay]
    const initialised: LoggedExercise[] = plan.exercises.map(ex => {
      const last = getLastTime(ex.id)
      const sets = last
        ? last.sets.map(s => ({ weight: s.weight, reps: s.reps }))
        : Array.from({ length: ex.defaultSets }, () => ({ weight: 0, reps: ex.defaultReps }))
      return { exerciseId: ex.id, name: ex.name, sets }
    })
    setSessionData(initialised)
    setSaved(false)
  }, [selectedDay, plans, getLastTime])

  const updateExercise = (index: number, updated: LoggedExercise) => {
    setSessionData(prev => prev.map((ex, i) => (i === index ? updated : ex)))
  }

  const saveSession = () => {
    const workout = plans[selectedDay]
    if (!workout.exercises.length) return

    const session: SessionLog = {
      id:          crypto.randomUUID(),
      date:        new Date().toISOString(),
      dayOfWeek:   selectedDay,
      workoutName: workout.name,
      exercises:   sessionData.filter(ex =>
        ex.sets.some(s => s.weight > 0 || s.reps > 0)
      ),
    }

    setHistory(prev => [session, ...prev])
    setSaved(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const plan = plans[selectedDay]
  const isRestDay = plan.exercises.length === 0

  return (
    <div className="px-4 pt-5 pb-6">
      {/* Header */}
      <div className="mb-5">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">
          {formatHeader()}
        </p>
        <h1 className="text-3xl font-black text-white tracking-tight leading-tight">
          {plan.name}
        </h1>
      </div>

      {/* Day picker */}
      <div className="relative mb-6">
        <select
          value={selectedDay}
          onChange={e => setSelectedDay(e.target.value as DayOfWeek)}
          className="w-full appearance-none rounded-xl px-4 py-3 text-sm font-semibold text-white outline-none cursor-pointer pr-10"
          style={{
            background: '#1a1a24',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          {DAYS.map(d => (
            <option key={d} value={d} style={{ background: '#1a1a24' }}>
              {d} — {plans[d].name}
            </option>
          ))}
        </select>
        <ChevronDown
          size={16}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>

      {/* Saved banner */}
      {saved && (
        <div
          className="flex items-center gap-3 rounded-2xl px-4 py-3 mb-5"
          style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
        >
          <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
          <div>
            <p className="text-sm font-bold text-emerald-400">Session saved!</p>
            <p className="text-xs text-emerald-600">Your workout has been logged to history.</p>
          </div>
        </div>
      )}

      {/* Rest day */}
      {isRestDay ? (
        <div
          className="rounded-2xl px-6 py-12 text-center"
          style={{ background: '#1e1e2e', border: '1px solid rgba(255,255,255,0.07)' }}
        >
          <p className="text-4xl mb-3">😴</p>
          <p className="text-lg font-bold text-white mb-1">Rest Day</p>
          <p className="text-sm text-gray-500">No workout planned. Recovery is part of the process.</p>
        </div>
      ) : (
        <>
          {/* Exercise loggers */}
          <div className="flex flex-col gap-4">
            {plan.exercises.map((exercise, i) => (
              <ExerciseLogger
                key={exercise.id}
                exercise={exercise}
                logged={sessionData[i] ?? { exerciseId: exercise.id, name: exercise.name, sets: [] }}
                lastTime={getLastTime(exercise.id)}
                onChange={updated => updateExercise(i, updated)}
              />
            ))}
          </div>

          {/* Save button */}
          <button
            onClick={saveSession}
            className="mt-6 w-full py-4 rounded-2xl text-base font-bold text-white flex items-center justify-center gap-2 transition-all active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
              boxShadow: '0 4px 24px rgba(99,102,241,0.35)',
            }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 32px rgba(99,102,241,0.55)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = '0 4px 24px rgba(99,102,241,0.35)' }}
          >
            <CheckCircle2 size={19} />
            Save Session
          </button>
        </>
      )}
    </div>
  )
}
