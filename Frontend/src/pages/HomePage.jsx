import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import ExamPreview from '../components/home/ExamPreview'

const HomePage = () => {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8">Online Examination System</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example exam previews */}
          <ExamPreview 
            title="Mathematics Final Exam"
            duration={60}
            description="Basic algebra and geometry questions"
            requiresAuth={!user}
          />
        </div>

        {!user && (
          <div className="text-center mt-8">
            <p className="mb-4">To take exams, please</p>
            <div className="space-x-4">
              <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
                Sign Up
              </Link>
              <Link to="/login" className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage