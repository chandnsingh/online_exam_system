import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./connection/connection.js";
import AuthRoutes from "./Routes/AuthRoutes.js";
import ExamRoutes from "./Routes/ExamRoutes.js";
import QuestionRoutes from './Routes/QuestionRoutes.js';
import StudentRoutes from './Routes/StudentRoutes.js';
import TeacherRoutes from './Routes/TeacherRoutes.js';


dotenv.config();

const app = express();


connectDB();


app.use(cors());
app.use(express.json());


app.use('/api/auth', AuthRoutes);
app.use('/api/exams', ExamRoutes);
app.use('/api/questions', QuestionRoutes); 
app.use('/api/student', StudentRoutes);
app.use('/api/teacher', TeacherRoutes);




app.get("/health", (req, res) => {
  res.json({ 
    status: "healthy",
    timestamp: new Date() 
  });
});


app.get("/", (req, res) => {
  res.json({ 
    message: "Welcome to the Online Examination System API",
    version: "1.0.0",
    docs: "/api-docs" 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});