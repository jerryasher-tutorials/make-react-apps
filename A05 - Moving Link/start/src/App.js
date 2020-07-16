import React, { useRef, useEffect } from 'react';
import './App.css';
import useMovement from './useMovement';

export default function App() {
  const canvasRef = useRef(null);

  const downRef = useRef(null);
  const rightRef = useRef(null);
  const upRef = useRef(null);
  const leftRef = useRef(null);

  const { x, y, direction, move } = useMovement();

  useEffect(() => {
    // init canvas on window creation (but won't do window resizes)
    const current = canvasRef.current;
    const context = current.getContext('2d');
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;
  }, []); // no dependencies => run only once

  useEffect(() => {
    // draw current state
    const current = canvasRef.current;
    const context = current.getContext('2d');
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    // context.fillRect(x, y, 100, 100);
    context.drawImage(downRef.current, x, y);

    const sprites = {
      ArrowUp: upRef,
      ArrowLeft: leftRef,
      ArrowDown: downRef,
      ArrowRight: rightRef,
    };

    if (direction in sprites) {
      const ref = sprites[direction];
      context.drawImage(ref.current, x, y);
    }
  }, [x, y, direction]);

  return (
    <div className='app'>
      <canvas ref={canvasRef} />

      <div className='arrows'>
        <button onClick={() => move('ArrowUp')}>Up</button>
        <button onClick={() => move('ArrowLeft')}>Left</button>
        <button onClick={() => move('ArrowDown')}>Down</button>
        <button onClick={() => move('ArrowRight')}>Right</button>
      </div>

      <div className='images'>
        <img ref={downRef} src='https://i.imgur.com/JYUB0m3.png' alt='Down' />
        <img ref={rightRef} src='https://i.imgur.com/GEXD7bk.gif' alt='Right' />
        <img ref={upRef} src='https://i.imgur.com/XSA2Oom.gif' alt='Up' />
        <img ref={leftRef} src='https://i.imgur.com/4LGAZ8t.gif' alt='Left' />
      </div>
    </div>
  );
}
