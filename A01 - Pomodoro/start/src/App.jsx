import React, { useState, useRef } from 'react';
import './App.css';

const initialTime = 1 * 5;

function padTime(n) {
  return n.toString().padStart(2, '0');
}

export default function App() {
  const [title, setTitle] = useState('Let the countdown begin');
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef(null);

  function startTimer() {
    if (intervalRef.current !== null) return;
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTitle("You're Doing Great!");
      setTimeLeft((current) => {
        if (current >= 1) return current - 1;
        return 0;
      });
    }, 1000);
  }

  function stopTimer() {
    if (intervalRef.current == null) return;
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setIsRunning(false);
    setTitle('Keep it up!');
  }

  function resetTimer() {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setTimeLeft(initialTime);
    setIsRunning(false);
    setTitle('Ready');
  }

  const minutes = padTime(Math.floor(timeLeft / 60));
  const seconds = padTime(timeLeft - minutes * 60);

  return (
    <div className='app'>
      <h2>{title}</h2>

      <div className='timer'>
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>

      <div className='buttons'>
        {!isRunning && <button onClick={startTimer}>Start</button>}
        {isRunning && <button onClick={stopTimer}>Stop</button>}
        <button onClick={resetTimer}>Reset</button>
      </div>
    </div>
  );
}
