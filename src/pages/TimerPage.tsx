import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTimer } from "../hooks/useTimer";
import { useSettings } from "../hooks/useSettings";
import beepSound from "/beep.mp3";

const TimerPage = () => {
  const { theme, timerDuration } = useSettings();
  const { timeLeft, isActive, setIsActive, setTimeLeft } = useTimer();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isBreakTime, setIsBreakTime] = useState(false);
  const [breakTimeLeft, setBreakTimeLeft] = useState(20);

  useEffect(() => {
    audioRef.current = new Audio(beepSound);
  }, []);

  useEffect(() => {
    document.body.className =
      theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  }, [theme]);

  useEffect(() => {
    if (timeLeft === 0) {
      handleTimerComplete();
    }
  }, [timeLeft]);

  const displayTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const timerTextColor = theme === "dark" ? "text-red-400" : "text-red-900";
  const buttonBaseStyle = theme === "dark" ? "text-gray-100" : "text-white";

  const resetTimer = () => {
    setTimeLeft(timerDuration * 60);
    setIsActive(false);
    localStorage.setItem("timeLeft", (timerDuration * 60).toString());
    localStorage.setItem("isActive", "false");
  };

  const handleTimerComplete = () => {
    setIsActive(false);
    audioRef.current?.play();
    setIsAlertOpen(true);
  };

  useEffect(() => {
    let breakTimer: NodeJS.Timeout;
    if (isBreakTime) {
      breakTimer = setInterval(() => {
        setBreakTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(breakTimer);
            audioRef.current?.play();
            setIsBreakTime(false);
            setBreakTimeLeft(20);
            resetTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(breakTimer);
  }, [isBreakTime]);

  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <div className={`text-9xl font-mono mb-10 ${timerTextColor}`}>
          {displayTime(timeLeft)}
        </div>
        <div className="space-x-4">
          <button
            onClick={() => setIsActive(!isActive)}
            className={`px-4 py-2 bg-red-400 font-bold rounded ${buttonBaseStyle}`}
            disabled={isBreakTime}
          >
            {isActive ? "Pause" : "Start"}
          </button>

          <button
            onClick={resetTimer}
            className={`px-4 py-2 bg-yellow-400 font-bold rounded ${buttonBaseStyle}`}
            disabled={isBreakTime}
          >
            Reset
          </button>
        </div>
      </div>
      <div className={`fixed bottom-10 w-full text-center ${
        theme === "dark" ? "text-gray-400" : "text-gray-600"
      }`}>
        <Link to="/settings">Settings</Link>
      </div>
    </>
  );
};

export default TimerPage;
