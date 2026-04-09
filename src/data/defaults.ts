import type { WorkoutPlans } from '../types'

const id = () => crypto.randomUUID()

export const DEFAULT_PLANS: WorkoutPlans = {
  Monday: {
    name: 'Push Day',
    exercises: [
      { id: id(), name: 'Bench Press',       defaultSets: 4, defaultReps: 8  },
      { id: id(), name: 'Shoulder Press',    defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Incline DB Press',  defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Lateral Raises',    defaultSets: 3, defaultReps: 15 },
      { id: id(), name: 'Tricep Pushdown',   defaultSets: 3, defaultReps: 12 },
    ],
  },
  Tuesday: {
    name: 'Pull Day',
    exercises: [
      { id: id(), name: 'Deadlift',          defaultSets: 4, defaultReps: 5  },
      { id: id(), name: 'Pull-Ups',          defaultSets: 3, defaultReps: 8  },
      { id: id(), name: 'Barbell Row',       defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Face Pulls',        defaultSets: 3, defaultReps: 15 },
      { id: id(), name: 'Bicep Curls',       defaultSets: 3, defaultReps: 12 },
    ],
  },
  Wednesday: {
    name: 'Leg Day',
    exercises: [
      { id: id(), name: 'Squats',              defaultSets: 4, defaultReps: 8  },
      { id: id(), name: 'Leg Press',           defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Romanian Deadlift',   defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Leg Curl',            defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Calf Raises',         defaultSets: 4, defaultReps: 15 },
    ],
  },
  Thursday: {
    name: 'Rest Day',
    exercises: [],
  },
  Friday: {
    name: 'Push Day',
    exercises: [
      { id: id(), name: 'Incline Bench Press',  defaultSets: 4, defaultReps: 8  },
      { id: id(), name: 'Arnold Press',         defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Cable Flyes',          defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Overhead Tricep Ext',  defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Tricep Dips',          defaultSets: 3, defaultReps: 10 },
    ],
  },
  Saturday: {
    name: 'Arm Day',
    exercises: [
      { id: id(), name: 'Barbell Curl',         defaultSets: 4, defaultReps: 10 },
      { id: id(), name: 'Skull Crushers',       defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Hammer Curls',         defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Cable Tricep Pushdown',defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Concentration Curls',  defaultSets: 3, defaultReps: 12 },
    ],
  },
  Sunday: {
    name: 'Rest Day',
    exercises: [],
  },
}
