import React, { useState, useEffect } from 'react';
import Question from './Question';
import ResultSummary from './ResultSummary';
import { fetchQuizData } from '../utils/api';

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [timeLeft, setTimeLeft] = useState(30);
  const [timerActive, setTimerActive] = useState(true);
  const [showSolutionButton, setShowSolutionButton] = useState(false);

  useEffect(() => {
    fetchQuizData().then((data) => setQuestions(data.questions));
  }, []);

  useEffect(() => {
    if (timeLeft > 0 && timerActive) {
      const timer = setInterval(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      handleNextQuestion();
    }
  }, [timeLeft, timerActive]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswerIndex(null);
      setTimeLeft(30);
      setTimerActive(true);
      setShowSolutionButton(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswerIndex(null);
      setTimeLeft(30);
      setTimerActive(true);
      setShowSolutionButton(false);
    }
  };

  const handleSubmit = () => {
    setIsCompleted(true);
  };

  const handleAnswerSelection = (index, isCorrect) => {
    setSelectedAnswerIndex(index);
    setTimerActive(false);
    setShowSolutionButton(true);
    if (isCorrect) setScore(score + 4); // Scoring based on JSON data
    else setScore(score - 1); // Negative marking from JSON data
  };

  return (
    <div>
      {isCompleted ? (
        <ResultSummary score={score} total={questions.length} />
      ) : (
        <div>
          <Question
            questionData={questions[currentQuestionIndex]}
            handleAnswerSelection={handleAnswerSelection}
            selectedAnswerIndex={selectedAnswerIndex}
            timeLeft={timeLeft}
            showSolutionButton={showSolutionButton}
          />
          <div className="navigation-buttons">
            <button onClick={handlePreviousQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
            <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
            <button onClick={handleSubmit}>Submit Test</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;