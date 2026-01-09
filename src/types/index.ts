export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

export type TimerState = 'idle' | 'running' | 'paused';

export interface Task {
    id: string;
    name: string;
    totalTime: number; // in milliseconds (work)
    breakTime?: number; // in milliseconds (breaks taken while this task was active)
    sessions: number; // count of completed sessions
}

export interface PomodoroSettings {
    workDuration: number; // in minutes
    shortBreakDuration: number; // in minutes
    longBreakDuration: number; // in minutes
}

export const WORK_TIME_MINUTES = 25;
export const SHORT_BREAK_MINUTES = 5;
export const LONG_BREAK_MINUTES = 15;
