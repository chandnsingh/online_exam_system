const ExamTimer = ({ seconds }) => {
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60)
    const remainingSecs = secs % 60
    return `${mins}:${remainingSecs.toString().padStart(2, '0')}`
  }

  return (
    <div className="bg-red-100 text-red-800 px-3 py-1 rounded">
      Time Remaining: {formatTime(seconds)}
    </div>
  )
}

export default ExamTimer