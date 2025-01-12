import React, { useState, useEffect, ReactNode } from "react";
import { SettingsContext } from "../contexts/SettingsContext";

interface SettingsProviderProps {
    children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {

    const [theme, setTheme] = useState<string>(localStorage.getItem("theme") || "light");
    const [timerDuration, setTimerDuration] = useState<number>(parseInt(localStorage.getItem("timerDuration") || "20", 10));

    useEffect(() => {
        localStorage.setItem("theme", theme);
    }, [theme]);

    useEffect(() => {
        localStorage.setItem("timerDuration", timerDuration.toString());
    }, [timerDuration]);

    return (
        <SettingsContext.Provider value={{ theme, timerDuration, setTheme, setTimerDuration }}>
            {children}
        </SettingsContext.Provider>
    );
}

