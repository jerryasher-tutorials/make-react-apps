import React, { FC, useState, useEffect } from 'react';
import Rock from './icons/Rock';
import Paper from './icons/Paper';
import Scissors from './icons/Scissors';
import './App.css';

enum Hand {
  rock = 'rock',
  paper = 'paper',
  scissors = 'scissors',
}

enum GameState {
  win = 'win',
  lose = 'lose',
  draw = 'draw',
} // 3. reset the game

// determine winner based on choices

const gestureLosesTo = (gesture: Hand) => {
  switch (gesture) {
    case Hand.rock:
      return Hand.paper;
    case Hand.paper:
      return Hand.scissors;
    case Hand.scissors:
      return Hand.rock;
  }
};

const gestureComponent = (gesture: Hand) => {
  switch (gesture) {
    case Hand.rock:
      return Rock;
    case Hand.paper:
      return Paper;
    case Hand.scissors:
      return Scissors;
  }
};

function renderIcon(gesture: Hand) {
  const Component = gestureComponent(gesture); // Paper, Rock, Scissors
  return <Component />;
}

const rule = (user: Hand, computer: Hand) => {
  if (user === computer) return GameState.draw;
  const winner = gestureLosesTo(user);
  if (winner === computer) return GameState.lose;
  return GameState.win;
};

type AppProps = unknown;
const App: FC<AppProps> = (props) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  const [userChoice, setUserChoice] = useState<Hand>(Hand.rock);
  const [computerChoice, setComputerChoice] = useState<Hand>(Hand.rock);

  const [gameState, setGameState] = useState<GameState | null>(null); // win, lose, draw
  const [message, setMessage] = useState('');

  const handleUserChoice = (gesture: Hand) => {
    setUserChoice(gesture);

    // determine win, lose, or draw
    const state = rule(gesture, computerChoice);
    if (state === GameState.win) {
      setWins((wins) => wins + 1);
      setMessage('You won!');
    } else if (state === GameState.lose) {
      setLosses((losses) => losses + 1);
      setMessage('You lost!');
    } else {
      setMessage("It's a draw!");
    }
    setGameState(state);
  };

  const resetGame = () => {
    setGameState(null);
    const choices = Object.keys(Hand);
    const randomChoice = choices[
      Math.floor(Math.random() * choices.length)
    ] as Hand;
    setComputerChoice(randomChoice);
  };

  useEffect(() => {
    resetGame(); // reset game first time through
  }, []);

  return (
    <div className="app">
      {' '}
      {/* information goes here */}
      <div className="info">
        <h2>Rock. Paper. Scissors</h2>

        {/* wins vs losses stats */}
        <div className="wins-losses">
          <div className="wins">
            <span className="number">{wins}</span>
            <span className="text">Win{wins !== 1 ? 's' : ''}</span>
          </div>

          <div className="losses">
            <span className="number">{losses}</span>
            <span className="text">Loss{losses !== 1 ? 'es' : ''}</span>
          </div>
        </div>
      </div>
      {/* the popup to show win/lose/draw */}
      {gameState && (
        <button
          onClick={() => resetGame()}
          className={`game-state ${gameState}`}
        >
          <div className="game-state-content">
            <p>{renderIcon(userChoice)}</p>
            <p>{message}</p>
            <p>{renderIcon(computerChoice)}</p>
          </div>
        </button>
      )}
      <div className="choices">
        {/* choices captions */}
        <div>You</div>
        <div />
        <div>Computer</div>

        {/* buttons for my choice */}
        <div>
          <button
            onClick={() => handleUserChoice(Hand.rock)}
            type="button"
            className="rock"
          >
            <Rock />
          </button>
          <button
            onClick={() => handleUserChoice(Hand.paper)}
            type="button"
            className="paper"
          >
            <Paper />
          </button>
          <button
            onClick={() => handleUserChoice(Hand.scissors)}
            type="button"
            className="scissors"
          >
            <Scissors />
          </button>
        </div>

        <div className="vs">vs</div>

        {/* show the computer's choice */}
        <div>
          <button type="button" className="computer-choice">
            ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;
