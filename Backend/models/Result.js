import mongoose from 'mongoose';

const resultSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User reference is required']
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: [true, 'Exam reference is required']
  },
  examSession: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ExamSession',
    required: [true, 'Exam session reference is required']
  },
  answers: [{
    question: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Question', 
      required: true 
    },
    selectedOption: { 
      type: String, 
      required: true 
    },
    isCorrect: { 
      type: Boolean, 
      required: true 
    },
    marksObtained: { 
      type: Number, 
      required: true,
      min: 0
    }
  }],
  score: {
    type: Number,
    required: true,
    min: 0
  },
  percentage: {
    type: Number,
    required: true,
    min: 0,
    max: 100
  },
  status: {
    type: String,
    enum: ['pass', 'fail'],
    required: true
  },
  submittedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Indexes for performance
resultSchema.index({ user: 1 });
resultSchema.index({ exam: 1 });
resultSchema.index({ user: 1, exam: 1 });

export default mongoose.model('Result', resultSchema);