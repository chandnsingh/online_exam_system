import express from 'express';
const router = express.Router();
import authenticationToken from '../middleware/auth.js';
import Exam from '../models/Exam.js';
import Result from '../models/Result.js';

// Get exam results
router.get('/:examId/results', authenticationToken, async (req, res) => {
  try {
    const exam = await Exam.findById(req.params.examId);
    if (!exam) return res.status(404).json({ message: 'Exam not found' });

    if (req.user.role !== 'admin' && exam.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized' });
    }

    const results = await Result.find({ exam: exam._id })
      .populate('user', 'username email')
      .populate('answers.question', 'questionText');

    res.json(results);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;