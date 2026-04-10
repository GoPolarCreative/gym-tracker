import type { WorkoutPlans } from '../types'

const id = () => crypto.randomUUID()

export const DEFAULT_PLANS: WorkoutPlans = {
  Monday: {
    name: 'Push Day',
    exercises: [
      { id: id(), name: 'BB Bench Press',  	     defaultSets: 4, defaultReps: 6  },
      { id: id(), name: 'DB Shoulder Press',         defaultSets: 4, defaultReps: 8 },
      { id: id(), name: 'Incline DB Press',          defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Pec Deck',  		     defaultSets: 3, defaultReps: 15 },
      { id: id(), name: 'Cable Lat Raises',          defaultSets: 4, defaultReps: 20 },
      { id: id(), name: 'Tricep Rope Pushdowns',     defaultSets: 3, defaultReps: 15 },
    ],
  },
  Tuesday: {
    name: 'Pull Day',
    exercises: [
      { id: id(), name: 'Deadlift',          defaultSets: 4, defaultReps: 5  },
      { id: id(), name: 'Pull-Ups',          defaultSets: 4, defaultReps: 6  },
      { id: id(), name: 'Seated Cable Row',  defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Lat Pull Down',     defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Face Pulls',        defaultSets: 3, defaultReps: 15 },
      { id: id(), name: 'Hammer Curls',      defaultSets: 3, defaultReps: 12 },
    ],
  },
  Wednesday: {
    name: 'Leg Day',
    exercises: [
      { id: id(), name: 'Squats',              defaultSets: 4, defaultReps: 6  },
      { id: id(), name: 'Leg Press',           defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Romanian Deadlift',   defaultSets: 4, defaultReps: 10 },
      { id: id(), name: 'Leg Curl',            defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Leg Extension',       defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Calf Raises',         defaultSets: 4, defaultReps: 15 },
    ],
  },
  Thursday: {
    name: 'Rest Day',
    exercises: [],
  },
  Friday: {
    name: 'Hybrid Arm Day',
    exercises: [
      { id: id(), name: 'BB Bench Press',  	     defaultSets: 4, defaultReps: 8  },
      { id: id(), name: 'Bent Over Row',             defaultSets: 4, defaultReps: 8 },
      { id: id(), name: 'EZ Bar Curl',               defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Hammer Curls',   	     defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Cable Curls',               defaultSets: 3, defaultReps: 15 },
      { id: id(), name: 'Tricep Rope Pushdowns',     defaultSets: 3, defaultReps: 15 },
      { id: id(), name: 'Skull Crushers',            defaultSets: 3, defaultReps: 8 },
      { id: id(), name: 'Forearm Curls',             defaultSets: 3, defaultReps: 12 },
    ],
  },
  Saturday: {
    name: 'Leg Day v2',
    exercises: [
      { id: id(), name: 'Hack Squat',           defaultSets: 4, defaultReps: 10 },
      { id: id(), name: 'Lunges',               defaultSets: 3, defaultReps: 10 },
      { id: id(), name: 'Leg Extension',        defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Leg Curls',		defaultSets: 3, defaultReps: 12 },
      { id: id(), name: 'Standing Calf Raises', defaultSets: 4, defaultReps: 12 },
    ],
  },
  Sunday: {
    name: 'Rest Day',
    exercises: [],
  },
}
