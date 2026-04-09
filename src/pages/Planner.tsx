import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp, Pencil, Check, GripVertical } from 'lucide-react'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { DEFAULT_PLANS } from '../data/defaults'
import type { DayOfWeek, WorkoutPlans, Exercise } from '../types'

const DAYS: DayOfWeek[] = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']

const DAY_EMOJI: Record<DayOfWeek, string> = {
  Monday:    '🔥',
  Tuesday:   '🏋️',
  Wednesday: '⚡',
  Thursday:  '💤',
  Friday:    '🔥',
  Saturday:  '💪',
  Sunday:    '☀️',
}

export default function Planner() {
  const [plans, setPlans] = useLocalStorage<WorkoutPlans>('workoutPlans', DEFAULT_PLANS)
  const [openDay, setOpenDay] = useState<DayOfWeek | null>(null)
  const [editingDayName, setEditingDayName] = useState<DayOfWeek | null>(null)
  const [dayNameDraft, setDayNameDraft] = useState('')
  const [addingExercise, setAddingExercise] = useState<DayOfWeek | null>(null)
  const [newExName, setNewExName] = useState('')
  const [newExSets, setNewExSets] = useState('3')
  const [newExReps, setNewExReps] = useState('10')
  const [editingEx, setEditingEx] = useState<string | null>(null)
  const [exDraft, setExDraft] = useState<{ name: string; sets: string; reps: string }>({ name: '', sets: '', reps: '' })

  const toggleDay = (day: DayOfWeek) => setOpenDay(prev => (prev === day ? null : day))

  const startEditDayName = (day: DayOfWeek) => {
    setEditingDayName(day)
    setDayNameDraft(plans[day].name)
  }

  const commitDayName = (day: DayOfWeek) => {
    if (!dayNameDraft.trim()) return
    setPlans(prev => ({
      ...prev,
      [day]: { ...prev[day], name: dayNameDraft.trim() },
    }))
    setEditingDayName(null)
  }

  const addExercise = (day: DayOfWeek) => {
    if (!newExName.trim()) return
    const exercise: Exercise = {
      id:          crypto.randomUUID(),
      name:        newExName.trim(),
      defaultSets: parseInt(newExSets) || 3,
      defaultReps: parseInt(newExReps) || 10,
    }
    setPlans(prev => ({
      ...prev,
      [day]: { ...prev[day], exercises: [...prev[day].exercises, exercise] },
    }))
    setNewExName('')
    setNewExSets('3')
    setNewExReps('10')
    setAddingExercise(null)
  }

  const deleteExercise = (day: DayOfWeek, id: string) => {
    if (!window.confirm('Remove this exercise from the plan?')) return
    setPlans(prev => ({
      ...prev,
      [day]: { ...prev[day], exercises: prev[day].exercises.filter(e => e.id !== id) },
    }))
  }

  const startEditEx = (ex: Exercise) => {
    setEditingEx(ex.id)
    setExDraft({ name: ex.name, sets: String(ex.defaultSets), reps: String(ex.defaultReps) })
  }

  const commitEditEx = (day: DayOfWeek, exId: string) => {
    if (!exDraft.name.trim()) return
    setPlans(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        exercises: prev[day].exercises.map(e =>
          e.id === exId
            ? { ...e, name: exDraft.name.trim(), defaultSets: parseInt(exDraft.sets) || e.defaultSets, defaultReps: parseInt(exDraft.reps) || e.defaultReps }
            : e
        ),
      },
    }))
    setEditingEx(null)
  }

  const resetToDefaults = () => {
    if (!window.confirm('Reset all workout plans to defaults? This will overwrite your current plan.')) return
    setPlans(DEFAULT_PLANS)
  }

  return (
    <div className="px-4 pt-5 pb-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-black text-white tracking-tight">Planner</h1>
        <p className="text-sm text-gray-500 mt-1">Customise your weekly workout split</p>
      </div>

      {/* Day list */}
      <div className="flex flex-col gap-3">
        {DAYS.map(day => {
          const plan = plans[day]
          const isOpen = openDay === day

          return (
            <div
              key={day}
              className="rounded-2xl overflow-hidden"
              style={{
                background: '#1e1e2e',
                border: isOpen ? '1px solid rgba(99,102,241,0.35)' : '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 2px 12px rgba(0,0,0,0.3)',
                transition: 'border-color 0.2s',
              }}
            >
              {/* Day header row */}
              <button
                onClick={() => toggleDay(day)}
                className="w-full flex items-center gap-3 px-4 py-4 text-left"
              >
                <span className="text-xl shrink-0">{DAY_EMOJI[day]}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">{day}</p>
                  <p className="text-sm font-bold text-white truncate">{plan.name}</p>
                </div>
                <span
                  className="text-xs font-semibold px-2.5 py-1 rounded-full shrink-0"
                  style={{ background: 'rgba(255,255,255,0.06)', color: '#9ca3af' }}
                >
                  {plan.exercises.length} {plan.exercises.length === 1 ? 'exercise' : 'exercises'}
                </span>
                <span className="text-gray-600 shrink-0">
                  {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </span>
              </button>

              {/* Expanded content */}
              {isOpen && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="px-4 pt-4 pb-2">
                    {/* Edit day name */}
                    <div className="flex items-center gap-2 mb-4">
                      {editingDayName === day ? (
                        <>
                          <input
                            autoFocus
                            value={dayNameDraft}
                            onChange={e => setDayNameDraft(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter') commitDayName(day) }}
                            className="flex-1 rounded-xl px-3 py-2 text-sm font-bold text-white outline-none"
                            style={{ background: '#252538', border: '1px solid rgba(99,102,241,0.5)' }}
                          />
                          <button
                            onClick={() => commitDayName(day)}
                            className="w-9 h-9 flex items-center justify-center rounded-xl text-emerald-400"
                            style={{ background: 'rgba(16,185,129,0.12)' }}
                          >
                            <Check size={16} />
                          </button>
                        </>
                      ) : (
                        <>
                          <p className="flex-1 text-sm font-bold text-white">{plan.name}</p>
                          <button
                            onClick={() => startEditDayName(day)}
                            className="w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 transition-all"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                            onMouseEnter={e => { e.currentTarget.style.color = '#818cf8' }}
                            onMouseLeave={e => { e.currentTarget.style.color = '#6b7280' }}
                          >
                            <Pencil size={14} />
                          </button>
                        </>
                      )}
                    </div>

                    {/* Exercise list */}
                    {plan.exercises.length === 0 && (
                      <p className="text-sm text-gray-600 text-center py-3">No exercises yet.</p>
                    )}

                    <div className="flex flex-col gap-2">
                      {plan.exercises.map(ex => (
                        <div
                          key={ex.id}
                          className="rounded-xl p-3"
                          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}
                        >
                          {editingEx === ex.id ? (
                            <div className="flex flex-col gap-2">
                              <input
                                autoFocus
                                value={exDraft.name}
                                onChange={e => setExDraft(d => ({ ...d, name: e.target.value }))}
                                placeholder="Exercise name"
                                className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-white outline-none"
                                style={{ background: '#252538', border: '1px solid rgba(99,102,241,0.4)' }}
                              />
                              <div className="flex gap-2">
                                <div className="flex-1">
                                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Sets</p>
                                  <input
                                    type="number"
                                    inputMode="numeric"
                                    value={exDraft.sets}
                                    onChange={e => setExDraft(d => ({ ...d, sets: e.target.value }))}
                                    className="w-full rounded-xl px-3 py-2 text-sm font-bold text-white text-center outline-none"
                                    style={{ background: '#252538', border: '1px solid rgba(255,255,255,0.08)' }}
                                  />
                                </div>
                                <div className="flex-1">
                                  <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Reps</p>
                                  <input
                                    type="number"
                                    inputMode="numeric"
                                    value={exDraft.reps}
                                    onChange={e => setExDraft(d => ({ ...d, reps: e.target.value }))}
                                    className="w-full rounded-xl px-3 py-2 text-sm font-bold text-white text-center outline-none"
                                    style={{ background: '#252538', border: '1px solid rgba(255,255,255,0.08)' }}
                                  />
                                </div>
                              </div>
                              <button
                                onClick={() => commitEditEx(day, ex.id)}
                                className="w-full py-2 rounded-xl text-xs font-bold text-emerald-400 transition-all"
                                style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.25)' }}
                              >
                                Save Changes
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              <GripVertical size={14} className="text-gray-700 shrink-0" />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-semibold text-white truncate">{ex.name}</p>
                                <p className="text-xs text-gray-500">
                                  {ex.defaultSets} sets × {ex.defaultReps} reps
                                </p>
                              </div>
                              <button
                                onClick={() => startEditEx(ex)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-600 transition-all shrink-0"
                                onMouseEnter={e => { e.currentTarget.style.color = '#818cf8'; e.currentTarget.style.background = 'rgba(99,102,241,0.1)' }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.background = 'transparent' }}
                              >
                                <Pencil size={13} />
                              </button>
                              <button
                                onClick={() => deleteExercise(day, ex.id)}
                                className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-600 transition-all shrink-0"
                                onMouseEnter={e => { e.currentTarget.style.color = '#f87171'; e.currentTarget.style.background = 'rgba(248,113,113,0.1)' }}
                                onMouseLeave={e => { e.currentTarget.style.color = '#4b5563'; e.currentTarget.style.background = 'transparent' }}
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Add exercise form */}
                    {addingExercise === day ? (
                      <div
                        className="mt-3 rounded-xl p-3 flex flex-col gap-2"
                        style={{ background: 'rgba(99,102,241,0.07)', border: '1px solid rgba(99,102,241,0.2)' }}
                      >
                        <input
                          autoFocus
                          value={newExName}
                          onChange={e => setNewExName(e.target.value)}
                          onKeyDown={e => { if (e.key === 'Enter') addExercise(day) }}
                          placeholder="Exercise name"
                          className="w-full rounded-xl px-3 py-2.5 text-sm font-semibold text-white placeholder-gray-600 outline-none"
                          style={{ background: '#252538', border: '1px solid rgba(99,102,241,0.4)' }}
                        />
                        <div className="flex gap-2">
                          <div className="flex-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Sets</p>
                            <input
                              type="number"
                              inputMode="numeric"
                              value={newExSets}
                              onChange={e => setNewExSets(e.target.value)}
                              className="w-full rounded-xl px-3 py-2 text-sm font-bold text-white text-center outline-none"
                              style={{ background: '#252538', border: '1px solid rgba(255,255,255,0.08)' }}
                            />
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1">Reps</p>
                            <input
                              type="number"
                              inputMode="numeric"
                              value={newExReps}
                              onChange={e => setNewExReps(e.target.value)}
                              className="w-full rounded-xl px-3 py-2 text-sm font-bold text-white text-center outline-none"
                              style={{ background: '#252538', border: '1px solid rgba(255,255,255,0.08)' }}
                            />
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => { setAddingExercise(null); setNewExName(''); }}
                            className="flex-1 py-2 rounded-xl text-xs font-bold text-gray-500 transition-all"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => addExercise(day)}
                            className="flex-1 py-2 rounded-xl text-xs font-bold text-white transition-all"
                            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                          >
                            Add Exercise
                          </button>
                        </div>
                      </div>
                    ) : (
                      <button
                        onClick={() => setAddingExercise(day)}
                        className="mt-3 w-full flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition-all"
                        style={{
                          color: '#818cf8',
                          background: 'rgba(99,102,241,0.08)',
                          border: '1px dashed rgba(99,102,241,0.3)',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.14)' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99,102,241,0.08)' }}
                      >
                        <Plus size={14} />
                        Add Exercise
                      </button>
                    )}
                  </div>
                  <div className="px-4 pb-4" />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Reset link */}
      <button
        onClick={resetToDefaults}
        className="mt-6 w-full text-center text-xs text-gray-600 py-2 hover:text-gray-400 transition-colors"
      >
        Reset to default plans
      </button>
    </div>
  )
}
