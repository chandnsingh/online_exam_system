import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { examAPI } from '../services/api'
import FullscreenHandler from '../utils/fullscreen'
import ExamTimer from '../components/exams/ExamTimer'
import QuestionList from '../components/exams/QuestionList'

const ExamPage = () => {
  const { examId } = useParams()
  const navigate = useNavigate()
  const [exam, setExam] = useState(null)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)

  useEffect(() => {
    const fs = new FullscreenHandler()
    fs.enter()

    const handleVisibilityChange = () => {
      if (document.hidden) {
        alert('Tab change detected! Exam will be submitted.')
        handleSubmit()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      fs.exit()
      document.removeEventListener('visibilitychange', handleVisibilityChange)
    }
  }, [])

  useEffect(() => {
    const initializeExam = async () => {
      try {
        const { data } = await examAPI.startExam(examId)
        setExam(data.exam)
        setTimeLeft(data.duration * 60)

        const timer = setInterval(() => {
          setTimeLeft(prev => {
            if (prev <= 1) {
              clearInterval(timer)
              handleSubmit()
              return 0
            }
            return prev - 1
          })
        }, 1000)
      } catch (error) {
        navigate('/dashboard', { state: { error: error.message } })
      }
    }
    initializeExam()
  }, [examId])

  const handleSubmit = async () => {
    try {
      const answerArray = Object.entries(answers).map(([qId, answer]) => ({
        questionId: qId,
        selectedOption: answer
      }))
      await examAPI.submitExam(examId, answerArray)
      navigate('/dashboard', { state: { success: 'Exam submitted successfully!' } })
    } catch (error) {
      alert('Submission failed: ' + error.message)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{exam?.title}</h1>
        <ExamTimer seconds={timeLeft} />
      </div>
      
      <QuestionList 
        questions={exam?.questions || []}
        answers={answers}
        setAnswers={setAnswers}
      />
      
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Exam
      </button>
    </div>
  )
}

export default ExamPage