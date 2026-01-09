import React from 'react';
import { useTimer } from './hooks/useTimer';
import { useTasks } from './hooks/useTasks';
import { Timer } from './components/Timer';
import { TaskList } from './components/TaskList';
import { WORK_TIME_MINUTES, SHORT_BREAK_MINUTES, LONG_BREAK_MINUTES } from './types';
import { useNotification } from './hooks/useNotification';
import { useDocumentTitle } from './hooks/useDocumentTitle';
import { formatTime } from './utils/time';

function App() {
    const { tasks, activeTaskId, addTask, selectTask, updateTaskTime } = useTasks();
    const { requestPermission, sendNotification, playSound } = useNotification();

    // Request permission on mount (or maybe on first start click?)
    React.useEffect(() => {
        requestPermission();
    }, [requestPermission]);

    // Alternative: useEffect in App that syncs with timer state.
    // This is often simpler in React than callbacks for state-dependent logic.

    const timer = useTimer();

    // Effect to track time
    React.useEffect(() => {
        let interval: number;
        if (timer.state === 'running' && timer.mode === 'work' && activeTaskId) {
            interval = setInterval(() => {
                updateTaskTime(activeTaskId, 1000); // Add 1 second
            }, 1000) as unknown as number;
        }
        return () => clearInterval(interval);
    }, [timer.state, timer.mode, activeTaskId, updateTaskTime]);

    // Derived state
    const activeTask = tasks.find(t => t.id === activeTaskId);

    const totalDuration = {
        work: WORK_TIME_MINUTES * 60,
        shortBreak: SHORT_BREAK_MINUTES * 60,
        longBreak: LONG_BREAK_MINUTES * 60,
    }[timer.mode];

    // Dynamic Title
    const modeLabel = {
        work: 'Focus',
        shortBreak: 'Short Break',
        longBreak: 'Long Break',
    }[timer.mode];

    useDocumentTitle(timer.state === 'running' ? `(${formatTime(timer.timeLeft)}) ${modeLabel}` : 'Pomodor');

    const prevTimeRef = React.useRef(timer.timeLeft);
    React.useEffect(() => {
        if (prevTimeRef.current > 0 && timer.timeLeft === 0) {
            // Timer completed
            sendNotification("Timer Finished!", { body: `${modeLabel} session is over.` });
            playSound();
        }
        prevTimeRef.current = timer.timeLeft;
    }, [timer.timeLeft, sendNotification, playSound, modeLabel]);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                <header className="p-6 flex justify-between items-center">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                        Pomodor
                    </h1>
                    {/* Theme toggle could go here */}
                </header>

                <main className="flex-1 flex flex-col items-center justify-center">
                    <div className="text-center mb-8 h-16">
                        {activeTask ? (
                            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 flex flex-col gap-2">
                                <span>{activeTask.name}</span>
                                <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    Current Session
                                </span>
                            </h2>
                        ) : (
                            <h2 className="text-2xl text-gray-400 italic">Select a task to start</h2>
                        )}
                    </div>

                    <Timer
                        timeLeft={timer.timeLeft}
                        mode={timer.mode}
                        state={timer.state}
                        onStart={() => {
                            if (!activeTaskId && timer.mode === 'work') {
                                alert("Please select a task first!");
                                // Or handle "Unallocated" logic? Req says: "Active Task: Timer is always associated with an active task (or "Unallocated" if none selected)."
                                // I'll auto-create an "Unallocated" task if none exists?
                                // For now, alert to select.
                                return;
                            }
                            timer.start();
                        }}
                        onPause={timer.pause}
                        onReset={timer.reset}
                        onSkip={timer.skip}
                        totalDuration={totalDuration}
                    />
                </main>
            </div>

            {/* Sidebar */}
            <div className="w-80 h-full shadow-xl z-10">
                <TaskList
                    tasks={tasks}
                    activeTaskId={activeTaskId}
                    onSelectTask={selectTask}
                    onAddTask={addTask}
                    isTimerRunning={timer.state === 'running'}
                />
            </div>
        </div>
    );
}

export default App;
