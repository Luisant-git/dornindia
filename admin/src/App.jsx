import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './components/AdminLayout'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import AdminTherapists from './pages/AdminTherapists'
import AdminClasses from './pages/AdminClasses'
import AdminTutorials from './pages/AdminTutorials'
import AdminFeedback from './pages/AdminFeedback'
import { ToastProvider } from './components/Toast'

function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/therapists" element={<AdminTherapists />} />
            <Route path="/classes" element={<AdminClasses />} />
            <Route path="/tutorials" element={<AdminTutorials />} />
            <Route path="/feedback" element={<AdminFeedback />} />
          </Route>
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      </ToastProvider>
    </BrowserRouter>
  )
}

export default App
