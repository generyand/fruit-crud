import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from 'sonner'
import { FiCheckCircle, FiAlertCircle } from 'react-icons/fi'
import Dashboard from './pages/Dashboard'
import { ThemeProvider, useTheme } from './contexts/ThemeContext'

function AppContent() {
  const { isDarkMode } = useTheme();

  return (
    <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-gray-900">
      <Toaster
        theme={isDarkMode ? 'dark' : 'light'}
        position="top-right"
        toastOptions={{
          style: {
            background: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#000000',
            border: `1px solid ${isDarkMode ? '#4B5563' : '#E5E7EB'}`,
          },
          success: {
            icon: <FiCheckCircle className="text-green-500" />,
            style: {
              background: isDarkMode ? '#065F46' : '#D1FAE5',
              color: isDarkMode ? '#ffffff' : '#065F46',
              border: `1px solid ${isDarkMode ? '#047857' : '#A7F3D0'}`,
            },
          },
          error: {
            icon: <FiAlertCircle className="text-red-500" />,
            style: {
              background: isDarkMode ? '#7F1D1D' : '#FEE2E2',
              color: isDarkMode ? '#ffffff' : '#991B1B',
              border: `1px solid ${isDarkMode ? '#991B1B' : '#FECACA'}`,
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}

export default App