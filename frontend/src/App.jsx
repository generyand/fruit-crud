import React from "react";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider, useTheme } from "./contexts/ThemeContext";

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-gray-900">
      <Toaster theme={isDarkMode ? "dark" : "light"} position="bottom-center" />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
