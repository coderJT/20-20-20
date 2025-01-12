import { useContext } from "react";
import { TimerContext } from "../contexts/TimerContext";

interface TimerContextType {
    timeLeft: number;
    isActive: boolean;
    setTimeLeft: (time: number) => void;
    setIsActive: (isActive: boolean) => void;
}

export const useTimer = (): TimerContextType => {
    const context = useContext(TimerContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}