import express from 'express';
const router = express.Router();
import authenticationToken from '../middleware/auth.js';
import Exam from '../models/Exam.js';
import Question from '../models/Question.js';

// Get all exams
router.get('/', async (req, res) => {
  try {
    const exams = await Exam.find().populate('questions');
    res.json(exams);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Get single exam
router.get('/:id', async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.id).populate('questions');
    if (!exam) return res.status(404).json({ message: 'Exam not found' });
    res.json(exam);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Create exam (Admin only)
router.post('/', authenticationToken, async (req, res) => {
  if (req.user.role !== 'admin' && req.user.role !== 'teacher') {
    return res.status(403).json({ message: 'Unauthorized access' });
  }

  try {
    const newExam = new Exam({
      ...req.body,
      createdBy: req.user.id
    });
    await newExam.save();
    res.status(201).json(newExam);
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;