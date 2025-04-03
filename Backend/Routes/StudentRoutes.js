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
    const exam = await Exam.findById(req.params.examId);
    if (!exam) {
      return res.status(404).json({ 
        success: false,
        message: 'Exam not found' 
      });
    }

    // Check if exam is available
    if (exam.status !== 'published') {
      return res.status(400).json({ 
        success: false,
        message: 'Exam is not available' 
      });
    }

    // Check for existing session
    const existingSession = await ExamSession.findOne({
      user: req.user.id,
      exam: exam._id,
      status: 'in-progress'
    });

    if (existingSession) {
      return res.status(400).json({ 
        success: false,
        message: 'Exam already started',
        sessionId: existingSession._id
      });
    }

    const newSession = new ExamSession({
      user: req.user.id,
      exam: exam._id,
      startTime: new Date(),
      status: 'in-progress',
      ipAddress: req.ip,
      deviceInfo: req.headers['user-agent']
    });

    await newSession.save();

    res.status(201).json({ 
      success: true,
      data: {
        sessionId: newSession._id,
        startTime: newSession.startTime,
        duration: exam.duration
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

// Get exam questions (for students)
router.get('/:examId/questions', authenticationToken, async (req, res) => {
  try {
    const session = await ExamSession.findOne({
      user: req.user.id,
      exam: req.params.examId,
      status: 'in-progress'
    });

    if (!session) {
      return res.status(403).json({ 
        success: false,
        message: 'Start exam first' 
      });
    }

    const exam = await Exam.findById(req.params.examId);
    const elapsed = (Date.now() - session.startTime) / 60000; // in minutes

    if (elapsed > exam.duration) {
      session.status = 'completed';
      await session.save();
      return res.status(403).json({ 
        success: false,
        message: 'Time expired' 
      });
    }

    const questions = await Question.find({ exam: exam._id })
      .select('-correctAnswer')
      .lean();

    res.json({ 
      success: true,
      data: questions,
      timeRemaining: exam.duration - elapsed
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

// Submit exam answers
router.post('/:examId/submit', authenticationToken, async (req, res) => {
  try {
    const { answers } = req.body;
    const session = await ExamSession.findOne({
      user: req.user.id,
      exam: req.params.examId,
      status: 'in-progress'
    });

    if (!session) {
      return res.status(403).json({ 
        success: false,
        message: 'No active session' 
      });
    }

    const exam = await Exam.findById(req.params.examId);
    const elapsed = (Date.now() - session.startTime) / 60000; // in minutes

    if (elapsed > exam.duration) {
      session.status = 'completed';
      await session.save();
      return res.status(400).json({ 
        success: false,
        message: 'Time expired' 
      });
    }

    // Calculate results
    const answerDetails = await Promise.all(answers.map(async a => {
      const question = await Question.findById(a.questionId);
      const isCorrect = question.correctAnswer === a.selectedOption;
      return {
        question: a.questionId,
        selectedOption: a.selectedOption,
        isCorrect,
        marksObtained: isCorrect ? question.marks : 0
      };
    }));

    const score = answerDetails.reduce((sum, a) => sum + a.marksObtained, 0);
    const percentage = (score / exam.totalMarks) * 100;
    const status = percentage >= exam.passingMarks ? 'pass' : 'fail';

    const result = new Result({
      user: req.user.id,
      exam: exam._id,
      examSession: session._id,
      answers: answerDetails,
      score,
      percentage,
      status,
      submittedAt: new Date()
    });

    await result.save();
    session.status = 'completed';
    session.endTime = new Date();
    await session.save();

    res.status(201).json({ 
      success: true,
      data: {
        score,
        percentage,
        status,
        totalMarks: exam.totalMarks,
        passingMarks: exam.passingMarks
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: error.message 
    });
  }
});

export default router;