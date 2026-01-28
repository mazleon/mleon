import { useState, useEffect, useRef } from 'react';

interface TypewriterOptions {
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseAfterTyping?: number;
    pauseBeforeTyping?: number;
}

export const useTypewriter = (
    phrases: string[],
    options: TypewriterOptions = {}
) => {
    const {
        typingSpeed = 80,
        deletingSpeed = 50,
        pauseAfterTyping = 1800,
        pauseBeforeTyping = 500
    } = options;

    const [currentPhrase, setCurrentPhrase] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [speed, setSpeed] = useState(typingSpeed);

    const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const animateText = () => {
            const currentFullPhrase = phrases[currentIndex % phrases.length];

            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            if (!isDeleting) {
                // Typing forward
                setCurrentPhrase((prev) => {
                    const nextChar = currentFullPhrase.substring(0, prev.length + 1);

                    if (nextChar === currentFullPhrase) {
                        setSpeed(pauseAfterTyping);
                        setIsDeleting(true);
                    } else {
                        setSpeed(typingSpeed);
                    }

                    return nextChar;
                });
            } else {
                // Deleting
                setCurrentPhrase((prev) => {
                    const nextChar = prev.substring(0, prev.length - 1);

                    if (nextChar === '') {
                        setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                        setIsDeleting(false);
                        setSpeed(pauseBeforeTyping);
                    } else {
                        setSpeed(deletingSpeed);
                    }

                    return nextChar;
                });
            }

            timeoutRef.current = setTimeout(animateText, speed);
        };

        timeoutRef.current = setTimeout(animateText, speed);

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, isDeleting, speed, phrases, typingSpeed, deletingSpeed, pauseAfterTyping, pauseBeforeTyping]);

    return currentPhrase;
};
