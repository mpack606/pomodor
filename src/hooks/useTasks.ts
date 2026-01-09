import { useState, useEffect, useCallback } from 'react';
import type { Task } from '../types';
import { loadTasks, saveTasks } from '../utils/storage';

export const useTasks = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [activeTaskId, setActiveTaskId] = useState<string | null>(null);

    useEffect(() => {
        const loaded = loadTasks();
        setTasks(loaded);
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const addTask = useCallback((name: string) => {
        const newTask: Task = {
            id: crypto.randomUUID(),
            name,
            totalTime: 0,
            sessions: 0,
        };
        setTasks(prev => [...prev, newTask]);
        // Auto-select if it's the first task? Maybe not.
    }, []);

    const selectTask = useCallback((id: string) => {
        setActiveTaskId(id);
    }, []);

    const updateTaskTime = useCallback((id: string, msToAdd: number) => {
        setTasks((prev) => prev.map(t => {
            if (t.id === id) {
                return { ...t, totalTime: t.totalTime + msToAdd };
            }
            return t;
        }));
    }, []);

    return { tasks, activeTaskId, addTask, selectTask, updateTaskTime };
};
