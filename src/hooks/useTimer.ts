import { useState, useEffect, useCallback, useRef } from 'react';
import type { TimerMode, TimerState } from '../types';
import { WORK_TIME_MINUTES, SHORT_BREAK_MINUTES, LONG_BREAK_MINUTES } from '../types';

export const useTimer = (onTick?: () => void) => {
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(WORK_TIME_MINUTES * 60);
    const [state, setState] = useState<TimerState>('idle');
    const timerRef = useRef<number | null>(null);
    const onTickRef = useRef(onTick);

    useEffect(() => {
        onTickRef.current = onTick;
    }, [onTick]);

    const getDuration = useCallback((currentMode: TimerMode) => {
        switch (currentMode) {
            case 'work': return WORK_TIME_MINUTES * 60;
            case 'shortBreak': return SHORT_BREAK_MINUTES * 60;
            case 'longBreak': return LONG_BREAK_MINUTES * 60;
        }
    }, []);

    const tick = useCallback(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                // Timer finished
                if (timerRef.current) clearInterval(timerRef.current);
                setState('idle');
                // Optional: auto-switch mode or play sound? For now just stop.
                return 0;
            }
            return prev - 1;
        });
        if (onTickRef.current) {
            onTickRef.current();
        }
    }, []);

    const start = useCallback(() => {
        if (state === 'running') return;
        setState('running');
        timerRef.current = setInterval(tick, 1000) as unknown as number;
    }, [state, tick]);

    const pause = useCallback(() => {
        if (state !== 'running') return;
        if (timerRef.current) clearInterval(timerRef.current);
        setState('paused');
    }, [state]);

    const reset = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        setState('idle');
        setTimeLeft(getDuration(mode));
    }, [mode, getDuration]);

    const skip = useCallback(() => {
        if (timerRef.current) clearInterval(timerRef.current);
        const nextMode: TimerMode = mode === 'work' ? 'shortBreak' : 'work'; // Simple toggle for now
        setMode(nextMode);
        setState('idle');
        setTimeLeft(getDuration(nextMode));
    }, [mode, getDuration]);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    return { timeLeft, mode, state, start, pause, reset, skip };
};
