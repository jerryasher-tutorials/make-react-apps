import React, { useState, useEffect, useCallback } from 'react';

import Question from './components/Question';
import CategorySelector from './components/CategorySelector';
import ResultModal from './components/ResultModal';
import Scoreboard from './components/Scoreboard';
import './App.css';

export default function App() {
  const [result, setResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('any');
  const [isCorrect, setIsCorrect] = useState(null);
  const [wrong, setWrong] = useState(0);
  const [right, setRight] = useState(0);

  const getTrivia = useCallback(() => {
    let apiUrl = `https://opentdb.com/api.php?amount=1`;
    if (selectedCategory !== 'any') {
      apiUrl += `&category=${selectedCategory}`;
    }
    console.log(apiUrl);
    setIsCorrect(null);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        const result = data.results[0];
        setResult(result);
      })
      .catch(alert);
  }, [selectedCategory]);

  useEffect(() => {
    getTrivia(selectedCategory);
  }, [getTrivia, selectedCategory]);

  const handleAnswerSubmission = (answer) => {
    if (answer === result.correct_answer) {
      setIsCorrect(true);
      setRight((right) => right + 1);
    } else {
      setIsCorrect(false);
      setWrong((wrong) => wrong + 1);
    }
  };

  console.log('isCorrect', isCorrect);
  return (
    <div className='app'>
      {/* show the result modal ----------------------- */}
      {isCorrect != null && (
        <ResultModal
          isCorrect={isCorrect}
          question={result}
          getTrivia={getTrivia}
        />
      )}
      {/* question header ----------------------- */}
      <div className='question-header'>
        <CategorySelector
          category={selectedCategory}
          chooseCategory={setSelectedCategory}
        />
        <Scoreboard right={right} wrong={wrong} />
      </div>
      {/* the question itself ----------------------- */}
      <div className='question-main'>
        <Question
          result={result}
          handleAnswerSubmission={handleAnswerSubmission}
        />
      </div>
      {/* question footer ----------------------- */}
      <div className='question-footer'>
        <button onClick={getTrivia}>
          Go to next question
          <span aria-label='finger pointing right' role='img'>
            👉
          </span>
        </button>
      </div>
    </div>
  );
}
