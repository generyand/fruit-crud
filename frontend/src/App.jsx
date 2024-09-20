import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import { ThemeProvider } from './contexts/ThemeContext'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen transition-colors duration-200 bg-white dark:bg-gray-900">
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
    </ThemeProvider>
  )
}

export default App