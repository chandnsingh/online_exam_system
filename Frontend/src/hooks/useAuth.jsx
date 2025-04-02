import { useContext } from 'react'
import { AuthContext } from '../context/Authcontext.jsx'

export const useAuth = () => useContext(AuthContext)