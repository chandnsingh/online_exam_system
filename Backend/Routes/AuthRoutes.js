import express from 'express';
const router = express.Router();
import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
dotenv.config();
import jwt from 'jsonwebtoken';
import authenticationToken from '../middleware/auth.js';


// Signup
router.post('/sign-up', async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if(username.length <10){
        return res.status(400).json({message: "Username should be atleast 10 characters long"});
    }

    const existingUsername = await User.findOne({username: username});
    if(existingUsername){
        return res.status(400).json({message: "Username already exists"});
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Please provide a valid email address" });
    }    
    
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    if(password.length < 6){
        return res.status(400).json({message: "Password should be atleast 6 characters long"});
    }
    const hashPassword = await bcrypt.hash(password, 10);
    user = new User({ 
        username :username, 
        email :email, 
        password : hashPassword,
    });
    await user.save();

    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

    res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).send('Server error');
  }
});

export default router;