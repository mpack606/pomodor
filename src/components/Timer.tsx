import React from 'react';
import { Play, Pause, Square, SkipForward } from 'lucide-react';
import type { TimerState, TimerMode } from '../types';
import { formatTime } from '../utils/time';
import { cn } from '../utils/cn';

interface TimerProps {
    timeLeft: number;
    mode: TimerMode;
    state: TimerState;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
    onSkip: () => void;
    totalDuration: number; // To calculate progress
}

export const Timer: React.FC<TimerProps> = ({
    timeLeft,
    mode,
    state,
    onStart,
    onPause,
    onReset,
    onSkip,
    totalDuration,
}) => {
    const progress = ((totalDuration - timeLeft) / totalDuration) * 100;

    // Circular progress math
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    const modeLabel = {
        work: 'Focus',
        shortBreak: 'Short Break',
        longBreak: 'Long Break',
    }[mode];

    return (
        <div className="flex flex-col items-center justify-center p-8">
            <div className="relative mb-8">
                {/* SVG Circle Timer */}
                <svg className="transform -rotate-90 w-80 h-80">
                    <circle
                        className="text-gray-200 dark:text-gray-700"
                        strokeWidth="8"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="160"
                        cy="160"
                    />
                    <circle
                        className={cn(
                            "transition-all duration-1000 ease-linear",
                            mode === 'work' ? "text-brand-500" : "text-green-500"
                        )}
                        strokeWidth="8"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r={radius}
                        cx="160"
                        cy="160"
                    />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <h2 className="text-2xl font-semibold text-gray-500 dark:text-gray-400 mb-2">{modeLabel}</h2>
                    <div className="text-6xl font-bold font-mono text-gray-900 dark:text-white">
                        {formatTime(timeLeft)}
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                {state === 'running' ? (
                    <>
                        <button
                            onClick={onPause}
                            className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            aria-label="Pause"
                        >
                            <Pause size={32} />
                        </button>
                        <button
                            onClick={onReset}
                            className="p-4 rounded-lg bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-900 dark:text-white transition-colors"
                            aria-label="Stop"
                        >
                            <Square size={32} />
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onStart}
                        className="p-6 rounded-lg bg-brand-500 hover:bg-brand-600 text-white shadow-lg transition-all hover:scale-105"
                        aria-label="Start"
                    >
                        <Play size={40} fill="currentColor" />
                    </button>
                )}
                {/* Skip button always available or only when paused? Usually always handy */}
                <button
                    onClick={onSkip}
                    className="p-4 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                    aria-label="Skip"
                >
                    <SkipForward size={24} />
                </button>
            </div>
        </div>
    );
};
