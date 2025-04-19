const express = require("express");
const router = express.Router();

const { getAllQuiz, createQuiz } = require("../controllers/quiz_controller");

router.get("/quizzes", getAllQuiz);
router.post("/createQuiz", createQuiz);

module.exports = router;
