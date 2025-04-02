import express from 'express';
const router = express.Router({ mergeParams: true });
import authenticationToken from '../middleware/auth.js';
import Exam from '../models/Exam.js';
import Question from '../models/Question.js';

// Add question to exam
router.post('/questions', authenticationToken, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    if (req.user.role !== 'admin' && exam.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const { questionText, options, correctAnswer, marks } = req.body;
    const newQuestion = new Question({
      exam: exam._id,
      questionText,
      options,
      correctAnswer,
      marks
    });

    await newQuestion.save();
    exam.questions.push(newQuestion._id);
    await exam.save();

    res.status(201).json(newQuestion);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get exam questions (for teachers/admins)
router.get('/questions', authenticationToken, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId).populate('questions');
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    if (req.user.role !== 'admin' && exam.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    res.json(exam.questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;