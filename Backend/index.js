import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connection/connection.js";
import cors from "cors";
import AuthRoutes from "./Routes/AuthRoutes.js";
import ExamRoutes from "./Routes/ExamRoutes.js";
import QuestionRoutes from './Routes/QuestionRoutes.js';
import StudentRoutes from './Routes/StudentRoutes.js';
import TeacherRoutes from './Routes/TeacherRoutes.js';
connectDB();

app.use(cors());
app.use(express.json());


app.use('/api/auth', AuthRoutes);
app.use('/api/exams',ExamRoutes);
app.use('/api/exams', QuestionRoutes);
app.use('/api/student', StudentRoutes);
app.use('/api/teacher', TeacherRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the Online Examination System API");
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});