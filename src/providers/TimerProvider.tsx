import React, { useState, useEffect, ReactNode } from "react";
import { useSettings } from "../hooks/useSettings";
import { TimerContext } from "../contexts/TimerContext";
import Alert from "../components/Alert";

interface TimerProviderProps {
    children: ReactNode;
}

export const TimerProvider: React.FC<TimerProviderProps> = ({ children }) => {
    const { timerDuration } = useSettings();
    const [timeLeft, setTimeLeft] = useState<number>(timerDuration * 60);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isBreakTime, setIsBreakTime] = useState(false);
    const [breakTimeLeft, setBreakTimeLeft] = useState(20);

    // Initialize timer with the selected duration
    useEffect(() => {
        setTimeLeft(timerDuration * 60);
    }, [timerDuration]);

    // Start the timer when the timer is active
    useEffect(() => {
        if (isActive && timeLeft > 0) {
            const interval = setInterval(() => {
                setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
            }, 1000);
            return () => clearInterval(interval);
        }

        if (timeLeft === 0 && !isAlertOpen && !isBreakTime) {
            setIsActive(false);
            setIsAlertOpen(true);
        }
    }, [isActive, timeLeft]);

    // Handle break timer
    useEffect(() => {
        let breakTimer: NodeJS.Timeout;
        if (isBreakTime) {
            breakTimer = setInterval(() => {
                setBreakTimeLeft((prev) => {
                    if (prev <= 1) {
                        clearInterval(breakTimer);
                        setIsBreakTime(false);
                        setBreakTimeLeft(20);
                        setTimeLeft(timerDuration * 60);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(breakTimer);
    }, [isBreakTime, timerDuration]);

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
        setIsBreakTime(true);
    };

    return (
        <TimerContext.Provider 
            value={{ 
                timeLeft, 
                isActive, 
                setTimeLeft, 
                setIsActive,
                isBreakTime,
                breakTimeLeft
            }}
        >
            {children}
            {isAlertOpen && (
                <Alert
                    isOpen={isAlertOpen}
                    message="Time's up! Get ready to look at something 20 feet away."
                    onClose={handleCloseAlert}
                />
            )}
            {isBreakTime && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl">
                        <p className="text-gray-800 dark:text-white text-lg mb-4">
                            Look at something 20 feet away
                        </p>
                        <div className="text-4xl font-bold text-center text-blue-500">
                            {breakTimeLeft}s
                        </div>
                    </div>
                </div>
            )}
        </TimerContext.Provider>
    );
}