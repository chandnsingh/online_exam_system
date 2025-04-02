import mongoose from 'mongoose';

const examSessionSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  startTime: { type: Date, required: true },
  status: { type: String, enum: ['in-progress', 'completed'], default: 'in-progress' }
});

export default mongoose.model('ExamSession', examSessionSchema);