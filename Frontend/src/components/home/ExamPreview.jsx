import { Link } from 'react-router-dom'

const ExamPreview = ({ title, duration, description, requiresAuth }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded">
          {duration} minutes
        </span>
        {requiresAuth ? (
          <Link 
            to="/signup"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Sign Up to Access
          </Link>
        ) : (
          <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded cursor-not-allowed">
            Available
          </button>
        )}
      </div>
    </div>
  )
}

export default ExamPreview