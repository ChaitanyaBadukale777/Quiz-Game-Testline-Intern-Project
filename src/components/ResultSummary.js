import React from 'react';

function ResultSummary({ score, total }) {
  return (
    <div className="result-summary">
      <h2>Quiz Completed!</h2>
      <p>Your Score: {score}/{total * 4}</p>
    </div>
  );
}

export default ResultSummary;