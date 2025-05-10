import axios from 'axios';
import { clearAuthTokens, getAccessToken } from './auth';
// Create axios instance
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Auto logout if 401 response returned from api
        clearAuthTokens();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
  

// Auth API
export const authApi = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: 'owner' | 'farm_laborer';
  }) => api.post('/auth/register', userData),
  forgotPassword: (email: string) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token: string, password: string) =>
    api.post('/auth/reset-password', { token, password }),
  getMe: () => api.get('/auth/me'),
};

// Applications API
export const applicationsApi = {
  getAll: () => api.get('/applications'),
  getById: (id: string) => api.get(`/applications/${id}`),
  create: (applicationData: {
    address: string;
    laborerNeeded: number;
    duration: string;
    paymentPerLaborer: number;
    description: string;
  }) => api.post('/applications', applicationData),
  update: (id: string, applicationData: any) =>
    api.put(`/applications/${id}`, applicationData),
  delete: (id: string) => api.delete(`/applications/${id}`),
  apply: (applicationId: string) =>
    api.post(`/applications/${applicationId}/apply`),
  getApplicants: (applicationId: string) =>
    api.get(`/applications/${applicationId}/applicants`),
  updateApplicantStatus: (
    applicationId: string,
    applicantId: string,
    status: 'pending' | 'accepted' | 'rejected'
  ) => api.patch(`/applications/${applicationId}/applicants/${applicantId}`, { status }),
};

// Attendance API
export const attendanceApi = {
  markAttendance: (data: {
    laborerId: string;
    applicationId: string;
    date: string;
    status: 'present' | 'absent' | 'leave';
  }) => api.post('/attendance', data),
  getAttendance: (params: {
    laborerId?: string;
    applicationId?: string;
    startDate?: string;
    endDate?: string;
  }) => api.get('/attendance', { params }),
  getAttendanceSummary: (params: {
    applicationId: string;
    month: number;
    year: number;
  }) => api.get('/attendance/summary', { params }),
};

// Users API
export const usersApi = {
  getAll: (role?: 'owner' | 'farm_laborer') =>
    api.get('/users', { params: { role } }),
  getById: (id: string) => api.get(`/users/${id}`),
  update: (id: string, userData: any) => api.put(`/users/${id}`, userData),
  delete: (id: string) => api.delete(`/users/${id}`),
  uploadImage: (id: string, imageFile: FormData) =>
    api.post(`/users/${id}/image`, imageFile, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
};

export default api;