import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export const authAPI = {
  login: (email, password) => api.post('/api/auth/login', { email, password }),
  signup: (username, email, password) => api.post('/api/auth/sign-up', { username, email, password }),
  getCurrentUser: () => api.get('/api/auth/me'),
}

export const examAPI = {
  getExams: () => api.get('/api/exams'),
  startExam: (examId) => api.post(`/api/student/${examId}/start`),
  submitExam: (examId, answers) => api.post(`/api/student/${examId}/submit`, { answers }),
  createExam: (examData) => api.post('/api/exams', examData),
}

export default api