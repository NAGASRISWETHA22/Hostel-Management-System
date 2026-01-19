import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import AdminDashboard from './pages/AdminDashboard';
import AdminStudents from './pages/AdminStudents';

const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Payment = lazy(() => import('./pages/Payment'));

const AdminRooms = lazy(() => import('./pages/AdminRooms'));


function App() {
  return (
    <Provider store={store}>
      <Router>
        <Suspense fallback={<div className="loading">Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/student/dashboard" element={<Dashboard />} />
            <Route path="/student/payment" element={<Payment />} />
            <Route path="/" element={<Login />} />
            <Route path="/student/payment" element={<Payment />} />
            <Route path="/admin/rooms" element={<AdminRooms />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/students" element={<AdminStudents />} />

          </Routes>
        </Suspense>
      </Router>
    </Provider>
  );
}

export default App;