import express from 'express';
const router = express.Router();
import authenticationToken from '../middleware/auth.js';
import Exam from '../models/Exam.js';
import Result from '../models/Result.js';

// Get exam results
router.get('/:examId/results', authenticationToken, async (req, res) => {
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

    const results = await Result.find({ exam: exam._id })
      .populate('user', 'username email')
      .populate('examSession', 'startTime endTime')
      .populate('answers.question', 'questionText marks')
      .sort({ score: -1 });

    const stats = {
      totalStudents: results.length,
      averageScore: results.reduce((sum, r) => sum + r.score, 0) / results.length,
      passCount: results.filter(r => r.status === 'pass').length,
      failCount: results.filter(r => r.status === 'fail').length
    };

    res.json({ 
      success: true,
      data: results,
      stats,
      exam: {
        title: exam.title,
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