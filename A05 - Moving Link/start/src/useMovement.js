import { useState, useEffect } from 'react';

export default function useMovement() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const [direction, setDirection] = useState('ArrowDown');

  const move = (direction) => {
    const moves = {
      ArrowUp: [setY, -20],
      ArrowLeft: [setX, -20],
      ArrowDown: [setY, 20],
      ArrowRight: [setX, 20],
    };
    if (direction in moves) {
      setDirection(direction);
      const [fn, offset] = moves[direction];
      fn.call(null, (was) => was + offset);
    }
  };

  useEffect(() => {
    // add move key listener to window
    const handleKeydown = (e) => {
      move(e.key);
    };
    window.addEventListener('keydown', handleKeydown);
    return () => window.removeEventListener('keydown', handleKeydown);
  }, []); // no dependencies => run only once

  return { x, y, direction, move };
}
