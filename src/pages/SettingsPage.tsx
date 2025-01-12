import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSettings } from "../hooks/useSettings";

const SettingsPage: React.FC = () => {
  const { theme, timerDuration, setTheme, setTimerDuration } = useSettings();
  const [inputValue, setInputValue] = useState(timerDuration.toString());
  const [error, setError] = useState<string>("");

  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [theme]);

  const inputStyles = `border border-gray-400 px-4 py-2 rounded ${
    theme === "dark" ? "bg-gray-700 text-white" : "bg-white text-black"
  }`;

  const buttonStyles = (isActive: boolean) =>
    `px-4 py-2 rounded ${
      isActive ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
    }`;

  const handleTimerChange = (value: string) => {
    const newValue = parseInt(value);

    if (!value) {
      setInputValue("");
      setError("");
    } else if (isNaN(newValue)) {
      setError("Please enter a valid number");
      setInputValue(timerDuration.toString());
    } else if (newValue > 20) {
      setError("Timer duration cannot exceed 20 minutes");
      setInputValue(timerDuration.toString());
    } else if (newValue < 1) {
      setError("Timer duration must be at least 1 minute");
      setInputValue(timerDuration.toString());
    } else {
      setError("");
      setInputValue(value);
      setTimerDuration(newValue);
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center px-6">
      <div className="space-y-6 w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-left w-full">Settings</h1>

        <div className="text-left">
          <label className="text-xl font-semibold mb-2">Theme</label>
          <div className="space-x-4">
            <button
              onClick={() => setTheme("light")}
              className={buttonStyles(theme === "light")}
            >
              Light
            </button>
            <button
              onClick={() => setTheme("dark")}
              className={buttonStyles(theme === "dark")}
            >
              Dark
            </button>
          </div>
        </div>

        <div className="text-left">
          <label className="text-xl font-semibold mb-2">
            Timer Duration (1-20 minutes):
          </label>
          <br />
          <input
            type="number"
            value={inputValue}
            onChange={(e) => handleTimerChange(e.target.value)}
            className={`${inputStyles} ${error ? "border-red-500" : ""}`}
            min="1"
            max="20"
          />
          {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        </div>

        <div className="text-left">
          <Link to="/timer">
            <button className="bg-red-600 text-white px-5 py-2 rounded-lg">
              Back to Timer
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
