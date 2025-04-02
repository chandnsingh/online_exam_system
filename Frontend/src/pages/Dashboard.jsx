import { useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { examAPI } from '../services/api'
import ExamCard from '../components/exams/ExamCard'

const Dashboard = () => {
  const { user } = useAuth()
  const [exams, setExams] = useState([])

  useEffect(() => {
    const loadExams = async () => {
      try {
        const { data } = await examAPI.getExams()
        setExams(data)
      } catch (error) {
        console.error('Failed to load exams:', error)
      }
    }
    loadExams()
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">
        {user?.role === 'student' ? 'Available Exams' : 'Manage Exams'}
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exams.map(exam => (
          <ExamCard key={exam._id} exam={exam} />
        ))}
      </div>
    </div>
  )
}

export default Dashboard