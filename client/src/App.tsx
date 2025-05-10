import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider }   from './services/auth.service';
import Layout from './components/layout/Layout';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import Dashboard from './pages/dashboard/Dashboard';
import Applications from './pages/dashboard/Applications';
import Attendance from './pages/dashboard/Attendance';
import Laborers from './pages/dashboard/Laborers';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <AuthProvider>
    
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* Private Routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="applications" element={<Applications />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="laborers" element={<Laborers />} />
          </Route>
        </Routes>
        
    </AuthProvider>

  );
}

export default App;