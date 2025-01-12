import { createContext } from "react";

interface TimerContextType {
    timeLeft: number;
    isActive: boolean;
    setTimeLeft: (time: number) => void;
    setIsActive: (isActive: boolean) => void;
    isBreakTime: boolean;
    breakTimeLeft: number;
}

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

