import express from 'express';
const router = express.Router({ mergeParams: true });
import authenticationToken from '../middleware/auth.js';
import Exam from '../models/Exam.js';
import Question from '../models/Question.js';
import { check, validationResult } from 'express-validator';

// Validation middleware
const validateQuestion = [
  check('questionText').notEmpty().withMessage('Question text is required'),
  check('options').isArray({ min: 2 }).withMessage('At least 2 options are required'),
  check('correctAnswer').notEmpty().withMessage('Correct answer is required'),
  check('marks').isInt({ min: 1 }).withMessage('Marks must be at least 1')
];

// Add question to exam
router.post('/', authenticationToken, validateQuestion, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const exam = await Exam.findById(req.params.examId);
    if (!exam) {
      return res.status(404).json({ 
        success: false,
        message: 'Exam not found' 
      });
    }

    // Check ownership
    if (req.user.role !== 'admin' && exam.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Unauthorized access' 
      });
    }

    const newQuestion = new Question({
      exam: exam._id,
      ...req.body
    });

    await newQuestion.save();
    
    exam.questions.push(newQuestion._id);
    await exam.save();

    res.status(201).json({ 
      success: true,
      data: newQuestion 
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

// Get exam questions
router.get('/', authenticationToken, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) {
      return res.status(404).json({ 
        success: false,
        message: 'Exam not found' 
      });
    }

    // Check ownership
    if (req.user.role !== 'admin' && exam.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ 
        success: false,
        message: 'Unauthorized access' 
      });
    }

    const questions = await Question.find({ exam: exam._id });
    
    res.json({ 
      success: true,
      data: questions,
      count: questions.length
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