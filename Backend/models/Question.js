import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: [true, 'Exam reference is required']
  },
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  questionType: {
    type: String,
    enum: ['mcq', 'true-false', 'short-answer'],
    default: 'mcq'
  },
  options: [{
    type: String,
    required: function() {
      return this.questionType === 'mcq';
    },
    validate: {
      validator: function(options) {
        return options.length >= 2;
      },
      message: 'At least two options are required for MCQ'
    }
  }],
  correctAnswer: {
    type: String,
    required: [true, 'Correct answer is required']
  },
  marks: {
    type: Number,
    required: [true, 'Marks are required'],
    min: [1, 'Marks must be at least 1']
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Question', questionSchema);