const Quiz = require("../models/quiz_model");
const mongoose = require("mongoose");

// code to get all quizzes
const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching quizzes" });
  }
};

// code to add a quiz
const createQuiz = async (req, res) => {
  const { title, questions } = req.body;
  console.log("Request Body:", req.body);

  //  checks if required field are present
  if (
    !title ||
    !questions ||
    !Array.isArray(questions) ||
    questions.length === 0
  ) {
    return res
      .status(400)
      .json({ message: "Title and questions are required" });
  }

  try {
    const newQuiz = new Quiz({
      title,
      questions,
    });

    // save quiz to database
    const savedQuiz = await newQuiz.save();
    res.status(201).json(savedQuiz); // send response
    console.log("Quiz created:", savedQuiz);
  } catch (err) {
    console.error("Error creating quiz:", err);
    res.status(500).json({ message: "Error creating quiz" });
  }
};

module.exports = {
  getAllQuiz,
  createQuiz,
};
