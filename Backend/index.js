import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();


app.get("/", (req, res) => {
  res.send("Welcome to the Online Examination System API");
});

app.listen(`${process.env.PORT}`, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});