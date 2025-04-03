import express from 'express';
const router = express.Router();
import authenticationToken from '../middleware/auth.js';
import Exam from '../models/Exam.js';
import { check, validationResult } from 'express-validator';

// Validation middleware
const validateExam = [
  check('title').notEmpty().withMessage('Title is required'),
  check('duration').isInt({ min: 1 }).withMessage('Duration must be at least 1 minute'),
  check('totalMarks').isInt({ min: 1 }).withMessage('Total marks must be at least 1')
];

// Get all exams (with pagination)
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const exams = await Exam.find()
      .skip(skip)
      .limit(limit)
      .populate('questions')
      .populate('createdBy', 'username');

    const total = await Exam.countDocuments();

    res.json({
      success: true,
      data: exams,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// Get single exam
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id)
      .populate('questions')
      .populate('createdBy', 'username');

    if (!exam) {
      return res.status(404).json({ 
        success: false,
        message: 'Exam not found' 
      });
    }

    res.json({ 
      success: true,
      data: exam 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

// Create exam (Admin/Teacher only)
router.post('/', authenticationToken, validateExam, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newExam = new Exam({
      ...req.body,
      createdBy: req.user.id
    });

    await newExam.save();

    res.status(201).json({ 
      success: true,
      data: newExam 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      message: 'Server error',
      error: err.message 
    });
  }
});

export default router;