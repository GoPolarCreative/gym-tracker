export type DayOfWeek =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export interface Exercise {
  id: string
  name: string
  defaultSets: number
  defaultReps: number
}

export interface WorkoutDay {
  name: string
  exercises: Exercise[]
}

export type WorkoutPlans = Record<DayOfWeek, WorkoutDay>

export interface SetLog {
  weight: number
  reps: number
}

export interface LoggedExercise {
  exerciseId: string
  name: string
  sets: SetLog[]
}

export interface SessionLog {
  id: string
  date: string
  dayOfWeek: DayOfWeek
  workoutName: string
  exercises: LoggedExercise[]
}
