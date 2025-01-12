import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SettingsProvider } from "./providers/SettingsProviders";
import { TimerProvider } from "./providers/TimerProvider";
import HomePage from "./pages/HomePage";
import SettingsPage from "./pages/SettingsPage";
import TimerPage from "./pages/TimerPage";

function App() {
  return (
    <SettingsProvider>
      <TimerProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/timer" element={<TimerPage />} />
          </Routes>
        </Router>
      </TimerProvider>
    </SettingsProvider>
  );
}

export default App;
