// import confetti from 'canvas-confetti';

import confetti from "canvas-confetti";

export const startConfetti = (duration = 15000) => {
    const end = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 50 };

    
    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const confettiInterval = setInterval(() => {
        const timeLeft = end - Date.now();

        if (timeLeft <= 0) {
            clearInterval(confettiInterval);
            return;
        }

        const particleCount = 50 * (timeLeft / duration);

        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
        confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return confettiInterval;
};

export const stopConfetti = (confettiInterval) => {
    if (confettiInterval) {
        clearInterval(confettiInterval);
    }
};
