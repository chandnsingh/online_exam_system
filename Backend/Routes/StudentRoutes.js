import express from 'express';
const router = express.Router();
import authenticationToken from '../middleware/auth.js';
import Exam from '../models/Exam.js';
import ExamSession from '../models/ExamSession.js';
import Question from '../models/Question.js';
import Result from '../models/Result.js';

// Start exam session
router.post('/:examId/start', authenticationToken, async (req, res) => {
  try {
    if (req.user.role !== 'student') return res.status(403).json({ message: 'Forbidden' });

    const exam = await Exam.findById(req.params.examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    const existingSession = await ExamSession.findOne({
      user: req.user.id,
      exam: exam._id,
      status: 'in-progress'
    });

    if (existingSession) return res.status(400).json({ message: 'Exam already started' });

    const newSession = new ExamSession({
      user: req.user.id,
      exam: exam._id,
      startTime: new Date()
    });

    await newSession.save();
    res.status(201).json({ startTime: newSession.startTime, duration: exam.duration });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get exam questions (for students)
router.get('/:examId/questions', authenticationToken, async (req, res) => {
  try {
    if (req.user.role !== 'student') return res.status(403).json({ message: 'Forbidden' });

    const session = await ExamSession.findOne({
      user: req.user.id,
      exam: req.params.examId,
      status: 'in-progress'
    });

    if (!session) return res.status(403).json({ message: 'Start exam first' });

    const exam = await Exam.findById(req.params.examId);
    const elapsed = (Date.now() - session.startTime) / 60000;

    if (elapsed > exam.duration) {
      session.status = 'completed';
      await session.save();
      return res.status(403).json({ message: 'Time expired' });
    }

    const questions = await Question.find({ exam: exam._id }).select('-correctAnswer');
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Submit exam answers
router.post('/:examId/submit', authenticationToken, async (req, res) => {
  try {
    if (req.user.role !== 'student') return res.status(403).json({ message: 'Forbidden' });

    const { answers } = req.body;
    const session = await ExamSession.findOne({
      user: req.user.id,
      exam: req.params.examId,
      status: 'in-progress'
    });

    if (!session) return res.status(403).json({ message: 'No active session' });

    const exam = await Exam.findById(req.params.examId);
    const elapsed = (Date.now() - session.startTime) / 60000;

    if (elapsed > exam.duration) {
      session.status = 'completed';
      await session.save();
      return res.status(400).json({ message: 'Time expired' });
    }

    let score = 0;
    const answerDetails = [];
    for (const a of answers) {
      const question = await Question.findById(a.questionId);
      const correct = question.correctAnswer === a.selectedOption;
      if (correct) score += question.marks;
      answerDetails.push({
        question: a.questionId,
        selectedOption: a.selectedOption,
        isCorrect: correct,
        marksObtained: correct ? question.marks : 0
      });
    }

    const result = new Result({
      user: req.user.id,
      exam: exam._id,
      answers: answerDetails,
      score,
      submittedAt: new Date()
    });

    await result.save();
    session.status = 'completed';
    await session.save();

    res.status(201).json({ message: 'Exam submitted', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;