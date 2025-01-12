import { useContext } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

interface SettingsContextType {
    theme: string;
    timerDuration: number;
    setTheme: (theme: string) => void;
    setTimerDuration: (timerDuration: number) => void;
}

export const useSettings = (): SettingsContextType => {
    const context = useContext(SettingsContext);
    if (!context) {
        throw new Error("useSettings must be used within a SettingsProvider");
    }
    return context;
}