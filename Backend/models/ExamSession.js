import mongoose from 'mongoose';

const examSessionSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  exam: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Exam', 
    required: true 
  },
  startTime: { 
    type: Date, 
    required: true,
    default: Date.now 
  },
  endTime: Date,
  status: { 
    type: String, 
    enum: ['not-started', 'in-progress', 'completed', 'terminated'], 
    default: 'not-started' 
  },
  ipAddress: String,
  deviceInfo: String,
  answers: [{
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question'
    },
    selectedOption: String,
    answeredAt: Date
  }]
}, {
  timestamps: true
});

// Index for faster queries
examSessionSchema.index({ user: 1, exam: 1 });

export default mongoose.model('ExamSession', examSessionSchema);