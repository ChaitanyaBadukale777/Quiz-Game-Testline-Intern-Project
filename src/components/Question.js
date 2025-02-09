import React, { useEffect, useRef, useState } from 'react';

function Question({ questionData, handleAnswerSelection, selectedAnswerIndex, timeLeft, showSolutionButton }) {
  const questionRef = useRef(null);
  const [showSolution, setShowSolution] = useState(false);

  useEffect(() => {
    if (questionRef.current) {
      questionRef.current.style.transition = 'opacity 1s';
      questionRef.current.style.opacity = 1;
    }
  }, [questionData]);

  if (!questionData) return null;

  const handleShowSolution = () => {
    setShowSolution(true);
  };

  return (
    <div className="question-card" ref={questionRef} style={{ opacity: 0 }}>
      <h2>{questionData.description}</h2>
      <div className="timer">Time Left: {timeLeft} seconds</div>
      <ul>
        {questionData.options && questionData.options.map((option, index) => (
          <li
            key={index}
            onClick={() => handleAnswerSelection(index, option.is_correct)}
            className={`hover-effect ${selectedAnswerIndex === index ? (option.is_correct ? 'correct' : 'incorrect') : ''}`}
          >
            {option.description}
          </li>
        ))}
      </ul>
      {selectedAnswerIndex !== null && showSolutionButton && (
        <button className="show-solution-button" onClick={handleShowSolution}>
          Show Solution
        </button>
      )}
      {showSolution && questionData.detailed_solution && (
        <div className="solution">
          <h3>Detailed Solution:</h3>
          <p>{questionData.detailed_solution}</p>
        </div>
      )}
    </div>
  );
}

export default Question;