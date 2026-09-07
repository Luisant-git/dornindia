import React from 'react';
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import ScrollToTop from './components/common/ScrollToTop';
import ScrollToTopButton from './components/common/ScrollToTopButton';
import Home from './pages/Home';
import About from './pages/About';
import Trainings from './pages/Trainings';
import Tutorials from './pages/Tutorials';
import Contact from './pages/Contact';
import LearningDorn from './pages/LearningDorn';
import Directory from './pages/Directory';

// Admin Imports
import AdminLayout from './admin/components/AdminLayout';
import ProtectedRoute from './admin/components/ProtectedRoute';
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminTherapists from './admin/pages/AdminTherapists';
import AdminClasses from './admin/pages/AdminClasses';
import AdminTutorials from './admin/pages/AdminTutorials';
import AdminFeedback from './admin/pages/AdminFeedback';
import { ToastProvider } from './admin/components/Toast';

function FrontendLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}

function App() {
  return (
    <Routes>
      {/* Public Frontend Routes */}
      <Route element={<FrontendLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/learning-dorn" element={<LearningDorn />} />
        <Route path="/trainings" element={<Trainings />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/directory" element={<Directory />} />
      </Route>

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ToastProvider>
            <Outlet />
          </ToastProvider>
        }
      >
        <Route path="login" element={<AdminLogin />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<Navigate to="/admin" replace />} />
            <Route path="therapists" element={<AdminTherapists />} />
            <Route path="classes" element={<AdminClasses />} />
            <Route path="tutorials" element={<AdminTutorials />} />
            <Route path="feedback" element={<AdminFeedback />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
