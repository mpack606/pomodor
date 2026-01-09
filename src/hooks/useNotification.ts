import { useCallback } from 'react';

export const useNotification = () => {
    const requestPermission = useCallback(async () => {
        if (!('Notification' in window)) return;
        if (Notification.permission !== 'granted') {
            await Notification.requestPermission();
        }
    }, []);

    const sendNotification = useCallback((title: string, options?: NotificationOptions) => {
        if (Notification.permission === 'granted') {
            new Notification(title, options);
        }
    }, []);

    const playSound = useCallback(() => {
        // Simple beep using Web Audio API to avoid external assets for now
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.type = 'sine';
        osc.frequency.value = 880; // A5
        gain.gain.value = 0.1;

        osc.start();
        osc.stop(ctx.currentTime + 0.5); // 0.5 seconds beep
    }, []);

    return { requestPermission, sendNotification, playSound };
};
