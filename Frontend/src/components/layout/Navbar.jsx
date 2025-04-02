import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth.jsx'

const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">Exam System</Link>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-600">Welcome, {user.username}</span>
              <button 
                onClick={logout}
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-blue-600">Login</Link>
              <Link to="/signup" className="text-gray-600 hover:text-blue-600">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar