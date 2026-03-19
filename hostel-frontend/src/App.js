import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';

import AdminStudents from './pages/AdminStudents';
import AdminDashboard from './pages/AdminDashboard'; 

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Payment = lazy(() => import('./pages/Payment'));
const AdminRooms = lazy(() => import('./pages/AdminRooms'));
const Home = lazy(() => import('./pages/Home'));

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            {/* Landing Page */}
            <Route path="/" element={<Home />} />
            
            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />

            {/* User Routes */}
            <Route path="/user/dashboard" element={<Dashboard />} />
            <Route path="/user/payment" element={<Payment />} />
            {/* Legacy routes for backward compatibility */}
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/student/payment" element={<Payment />} />

            {/* Admin Routes */}
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<AdminStudents />} />
            <Route path="/admin/rooms" element={<AdminRooms />} />

            {/* Catch-all route to prevent blank screen */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;