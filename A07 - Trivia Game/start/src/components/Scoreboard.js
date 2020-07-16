import React from 'react';

export default function Scoreboard({ wrong, right }) {
  return (
    <div className='scoreboard'>
      <div className='wrong'>
        <strong>{wrong}</strong>
        <span>wrong</span>
      </div>
      <div className='correct'>
        <strong>{right}</strong>
        <span>correct</span>
      </div>
    </div>
  );
}
