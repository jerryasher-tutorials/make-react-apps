import React from 'react';

export default function ResultModal({ isCorrect, question, getTrivia }) {
  return (
    <div className={`result-modal ${isCorrect ? 'is-correct' : 'is-wrong'}`}>
      <div className='overlay' />
      <div className='result-modal-content'>
        {isCorrect && (
          <h3>
            <span aria-label='fist bump' role='img'>
              👊👊👊
            </span>
            <br />
            YOU WON!
          </h3>
        )}

        {!isCorrect && (
          <h3>
            <span aria-label='unhappy face' role='img'>
              😟😢😟
            </span>
            <br />
            YOU LOST!
          </h3>
        )}
        {!isCorrect && (
          <div className='correct-answer'>
            <small>The correct answer was:</small>
            <br />
            <strong
              dangerouslySetInnerHTML={{ __html: question.correct_answer }}
            />
          </div>
        )}

        <button onClick={getTrivia}>
          Go to next question
          <span role='img' aria-label='right pointing finger'>
            👉
          </span>
        </button>
      </div>
    </div>
  );
}
