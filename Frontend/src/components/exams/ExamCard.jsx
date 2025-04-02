import { Link } from 'react-router-dom'

const ExamCard = ({ exam }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <h3 className="text-xl font-bold mb-2">{exam.title}</h3>
      <p className="text-gray-600 mb-4">{exam.description}</p>
      <div className="flex justify-between items-center">
        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
          Duration: {exam.duration} mins
        </span>
        <Link 
          to={`/exams/${exam._id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Start Exam
        </Link>
      </div>
    </div>
  )
}

export default ExamCard