const QuestionList = ({ questions, answers, setAnswers }) => {
  const handleAnswerSelect = (questionId, option) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: option
    }))
  }

  return (
    <div className="space-y-6">
      {questions.map((q, index) => (
        <div key={q._id} className="border p-4 rounded">
          <p className="font-medium mb-2">{index + 1}. {q.questionText}</p>
          <div className="space-y-2">
            {q.options.map((opt, i) => (
              <label key={i} className="flex items-center space-x-2">
                <input
                  type="radio"
                  name={`q_${q._id}`}
                  value={opt}
                  checked={answers[q._id] === opt}
                  onChange={() => handleAnswerSelect(q._id, opt)}
                  className="h-4 w-4"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuestionList