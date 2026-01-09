import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Task } from '../types';
import { formatDuration } from '../utils/time';
import { cn } from '../utils/cn';

interface TaskListProps {
    tasks: Task[];
    activeTaskId: string | null;
    onSelectTask: (id: string) => void;
    onAddTask: (name: string) => void;
    isTimerRunning: boolean; // To disable selection
}

export const TaskList: React.FC<TaskListProps> = ({
    tasks,
    activeTaskId,
    onSelectTask,
    onAddTask,
    isTimerRunning,
}) => {
    const [newTaskName, setNewTaskName] = useState('');

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskName.trim()) return;
        onAddTask(newTaskName);
        setNewTaskName('');
    };

    return (
        <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-800/50 p-6 border-l border-gray-200 dark:border-gray-800">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white">Tasks</h2>

            <form onSubmit={handleAddTask} className="mb-6 flex gap-2">
                <input
                    type="text"
                    value={newTaskName}
                    onChange={(e) => setNewTaskName(e.target.value)}
                    placeholder="Add a new task..."
                    className="flex-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="p-2 bg-brand-500 text-white rounded-md hover:bg-brand-600 transition-colors"
                >
                    <Plus size={24} />
                </button>
            </form>

            <div className="flex-1 overflow-y-auto space-y-3">
                {tasks.map((task) => (
                    <div
                        key={task.id}
                        onClick={() => !isTimerRunning && onSelectTask(task.id)}
                        className={cn(
                            "p-4 rounded-sm cursor-pointer transition-all border-2",
                            activeTaskId === task.id
                                ? "border-brand-500 bg-brand-50 dark:bg-brand-900/20"
                                : "border-transparent bg-white dark:bg-gray-800 hover:border-gray-200 dark:hover:border-gray-700",
                            isTimerRunning && activeTaskId !== task.id && "opacity-50 cursor-not-allowed"
                        )}
                    >
                        <div className="font-semibold text-gray-900 dark:text-white mb-1">{task.name}</div>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 gap-2">
                            <span>spent: {formatDuration(task.totalTime)}</span>
                            {/* Note: I don't have detailed break tracking per task in the types yet, just totalTime. 
                  Unless "sessions" implies breaks? Re-reading reqs: "spent: 45 min (15 min breaks)".
                  The user asked for this format. I need to track break time per task?
                  "Active Task: Timer is always associated with an active task".
                  If I take a break while a task is active, does that break count towards that task?
                  Usually breaks are general. But if the user wants "(15 min breaks)" shown IN the task item, 
                  it implies tracking breaks per task.
                  I should add `breakTime` to Task type.
                  For now I will show placeholders or simplistic data until I update types.
              */}
                            {/* <span className="flex items-center gap-1"><Coffee size={12}/> 0m</span> */}
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && (
                    <div className="text-center text-gray-400 py-10">No tasks yet. Create one to get started!</div>
                )}
            </div>
        </div>
    );
};
