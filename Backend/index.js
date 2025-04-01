import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./connection/connection.js";
import cors from "cors";
import AuthRoutes from "./Routes/AuthRoutes.js";
import ExamRoutes from "./Routes/ExamRoutes.js";
connectDB();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', AuthRoutes);
app.use('/api/exams',ExamRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the Online Examination System API");
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});