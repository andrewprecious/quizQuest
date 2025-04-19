import { useEffect, useState } from "react";
import homeStyle from "./home.module.css";
import appStyle from "../../App.module.css";
import axios from "axios";
import { URL } from "../../App";

const Home = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuiz = quizzes[0]; // Get the first quiz
  const currentQuestion = currentQuiz?.questions?.[currentQuestionIndex]; // Access questions in the first quiz
  const [timeRemaining, setTimeRemaining] = useState(15);
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const getResultData = () => {
    if (score > 6) {
      return { image: "/gold.png", message: "And congrats!" };
    } else if (score <= 6 && score > 4) {
      return { image: "/silver.png", message: "And nice" };
    } else if (score <= 4 && score >= 2) {
      return { image: "/bronze.png", message: "And passable" };
    } else if (score === 1) {
      return { image: "/emojy.png", message: "And sorry" };
    } else {
      return { image: "/emojy.png", message: "You did not get any points!" };
    }
  };

  useEffect(() => {
    // Stop the timer if the quiz is completed or if time is up
    if (quizCompleted || timeRemaining === 0) return;

    // Start the countdown timer
    const timerId = setInterval(() => {
      setTimeRemaining((prevTime) => prevTime - 1);
    }, 1000);

    // Clean up the interval when the component is unmounted or quiz is completed
    return () => clearInterval(timerId);
  }, [timeRemaining, quizCompleted]);

  useEffect(() => {
    // If time is up and no answer is selected, show feedback
    if (timeRemaining === 0 && !selectedOption) {
      setShowFeedback(true);

      // Wait for feedback to show, then go to next question
      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    }
  }, [timeRemaining, selectedOption]);

  // Convert seconds to minutes and seconds for display
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;

  // fetch quiz from backend
  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get(`${URL}/quizzes`);

        setQuizzes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getQuizzes();
  }, []);

  // stop the user from re-selecting another option
  const handleOptionClick = (option) => {
    if (showFeedback) return;
    setSelectedOption(option);
    setShowFeedback(true);

    if (option === currentQuestion.answer) {
      setScore((prevScore) => prevScore + 1); // Increase score if the answer is correct
    }
  };

  // handle next question
  const handleNextQuestion = () => {
    const nextIndex = currentQuestionIndex + 1;

    if (nextIndex < currentQuiz?.questions?.length) {
      setCurrentQuestionIndex(nextIndex);
      setSelectedOption(null);
      setShowFeedback(false);
      setTimeRemaining(15);
      setIsTimeUp(false);
    } else {
      // End of quiz
      setQuizCompleted(true);
    }
  };

  // Restart Quiz
  const handleRestartQuiz = () => {
    setScore(0);
    setQuizCompleted(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setShowFeedback(false);
    setTimeRemaining(15);
    setIsTimeUp(false);
  };

  // end quiz
  const handleEndQuiz = () => {
    setQuizCompleted(true);
    setTimeRemaining(0);
  };

  // Check if the current question is the last one
  const isLastQuestion =
    currentQuestionIndex === currentQuiz?.questions?.length - 1;

  return (
    <div className={`${appStyle.body}`}>
      {/* show quiz only if not completed */}
      {!quizCompleted && (
        <div className={`${homeStyle.container}`}>
          {/* first child starts */}
          <header className={`${homeStyle.header}`}>
            <h2>Quiz</h2>
            <p className={`${homeStyle.statusTime}`}>
              Time:{" "}
              <span className={`${homeStyle.time}`}>{`${minutes}:${
                seconds < 10 ? `0${seconds}` : seconds
              }`}</span>
            </p>
          </header>

          {/* second child starts */}

          <main
            className={`${homeStyle.mainQuestion}`}
            key={currentQuestion?._id}
          >
            {currentQuestion && !quizCompleted && (
              <div className={`${homeStyle.questionContainer}`}>
                <p>{currentQuestion.question}</p>
                <ul className={`${homeStyle.answerContainer}`}>
                  {currentQuestion.options.map((option, optionIndex) => {
                    let optionClass = "";
                    if (showFeedback) {
                      if (option === currentQuestion.answer) {
                        optionClass = homeStyle.correct; //green
                      } else if (option === selectedOption) {
                        optionClass = homeStyle.wrong; //red
                      }
                    }
                    return (
                      <li
                        key={optionIndex}
                        className={`${homeStyle.answer}  ${
                          showFeedback ? homeStyle.disabledHover : ""
                        }`}
                        style={
                          showFeedback && option === currentQuestion.answer
                            ? { backgroundColor: "green", color: "white" }
                            : selectedOption === option &&
                              option !== currentQuestion.answer
                            ? { backgroundColor: "red", color: "white" }
                            : {}
                        }
                        onClick={() => handleOptionClick(option)}
                      >
                        {option}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </main>

          {/* third child starts */}
          <footer className={`${homeStyle.footer}`}>
            <p className={`${homeStyle.questionNum}`}>
              <span className={`${homeStyle.first}`}>
                {currentQuestionIndex + 1}
              </span>
              of
              <span className={`${homeStyle.last}`}>
                {currentQuiz?.questions?.length}
              </span>
              Questions
            </p>
            {/* {conditionally render the next btn or end btn} */}
            {isLastQuestion ? (
              <button
                className={homeStyle.endQuestion}
                onClick={handleEndQuiz}
                style={{ display: "inline-block" }}
              >
                End
              </button>
            ) : (
              <button
                className={homeStyle.nextQuestion}
                onClick={handleNextQuestion}
              >
                Next
              </button>
            )}
          </footer>
        </div>
      )}

      {quizCompleted && (
        <div className={`${homeStyle.resultBox}`} style={{ display: "flex" }}>
          <div className={`${homeStyle.cup}`}>
            <img
              className={`${homeStyle.img}`}
              src={getResultData().image}
              alt="gold cup"
            />
          </div>
          <div className={`${homeStyle.message}`}>
            <p className={`${homeStyle.messageText}`}>
              {getResultData().message}
            </p>
            <p className={`${homeStyle.resultNum}`}>
              You Got
              <span className={`${homeStyle.resultRight}`}>{score}</span>
              Out Of
              <span className={`${homeStyle.ofQuestion}`}>
                {currentQuiz?.questions?.length}
              </span>
            </p>
          </div>
          <button
            className={`${homeStyle.restartQuiz}`}
            onClick={handleRestartQuiz}
          >
            Restart Quiz
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
