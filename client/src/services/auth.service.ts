import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { authApi } from './api';
import { setAuthTokens, clearAuthTokens, isAuthenticated } from './auth';
import React from 'react';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'owner' | 'farm_laborer';
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'owner' | 'farm_laborer';
  }) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  forgotPassword: async () => {},
  resetPassword: async () => {},
  loading: true,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      if (isAuthenticated()) {
        try {
          const response = await authApi.getMe();
          setUser(response.data);
        } catch (error) {
          clearAuthTokens();
        }
      }
      setLoading(false);
    };
    initializeAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authApi.login({ email, password });
      setAuthTokens(response.data.accessToken);
      setUser(response.data.user);
      navigate('/dashboard');
      toast.success('Logged in successfully');
    } catch (error) {
      toast.error('Invalid credentials');
      throw error;
    }
  };

  const register = async (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'owner' | 'farm_laborer';
  }) => {
    try {
      const response = await authApi.register(userData);
      setAuthTokens(response.data.accessToken);
      setUser(response.data.user);
      navigate('/dashboard');
      toast.success('Registered successfully');
    } catch (error) {
      toast.error('Registration failed');
      throw error;
    }
  };

  const logout = () => {
    clearAuthTokens();
    setUser(null);
    navigate('/login');
    toast.success('Logged out successfully');
  };

  const forgotPassword = async (email: string) => {
    try {
      await authApi.forgotPassword(email);
      toast.success('Password reset link sent to your email');
    } catch (error) {
      toast.error('Failed to send reset link');
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authApi.resetPassword(token, password);
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (error) {
      toast.error('Failed to reset password');
      throw error;
    }
  };

  const value: AuthContextType = {
    isAuthenticated: !!user,
    user,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    loading
  };

  return React.createElement(
    AuthContext.Provider,
    { value: value as AuthContextType },
    !loading && children
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};