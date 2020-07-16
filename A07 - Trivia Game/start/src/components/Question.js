import React from 'react';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export default function Question({ result, handleAnswerSubmission }) {
  console.log('result', result);
  if (result) {
    const { question, correct_answer, incorrect_answers } = result;
    let answers = [correct_answer, ...incorrect_answers];

    console.log('question', question);
    console.log('correct answer', correct_answer);
    console.log('answers', answers);

    for (let i = 0; i < answers.length; i++) {
      const swap = getRandomInt(answers.length);
      [answers[swap], answers[i]] = [answers[i], answers[swap]];
    }

    console.log('swapped answers', answers);

    return (
      <div className='question'>
        <h2 dangerouslySetInnerHTML={{ __html: question }} />

        {answers.map((answer, index) => (
          <button
            onClick={() => handleAnswerSubmission(answer)}
            key={index}
            value={answer}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div>
        <h2>loading</h2>
      </div>
    );
  }
}
