import type { Task } from '../types';

const STORAGE_KEY = 'pomodoro_tasks';

export const loadTasks = (): Task[] => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Failed to load tasks', error);
        return [];
    }
};

export const saveTasks = (tasks: Task[]) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
        console.error('Failed to save tasks', error);
    }
};
