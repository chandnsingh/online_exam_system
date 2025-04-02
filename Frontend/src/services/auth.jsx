import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { authAPI } from './api.js'
import { AuthContext } from '../context/Authcontext.jsx'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token')
      if (!token) return setLoading(false)
      
      try {
        const { data } = await authAPI.getCurrentUser()
        setUser(data.user)
      } catch (error) {
        localStorage.removeItem('token')
        console.error('Token verification failed:', error)
      }
      setLoading(false)
    }
    verifyToken()
  }, [])

  const login = async (email, password) => {
    try {
      const { data } = await authAPI.login(email, password)
      localStorage.setItem('token', data.token)
      setUser(data.user)
      navigate('/dashboard')
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message }
    }
  }

  const signup = async (username, email, password) => {
    try {
      const { data } = await authAPI.signup(username, email, password)
      localStorage.setItem('token', data.token)
      setUser({ ...data.user })
      navigate('/dashboard')
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message }
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    navigate('/')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}