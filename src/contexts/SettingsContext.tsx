import { createContext } from "react";

interface SettingsContextType {
    theme: string;
    timerDuration: number;
    setTheme: (theme: string) => void;
    setTimerDuration: (timerDuration: number) => void;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);


