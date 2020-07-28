import React, { useState } from 'react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './App.css';

export default function App() {
  const handleDrop = (slot, item) => {
    switch (slot) {
      case 'setOperator':
        setOperator(item.text);
        break;
      case 'setNumber1':
        setNumber1(item.text);
        break;
      case 'setNumber2':
        setNumber2(item.text);
        break;
      default:
    }
  };

  const Card = ({ type, text }) => {
    const [{ opacity }, dragRef] = useDrag({
      item: { type, text },
      collect: monitor => ({ opacity: monitor.isDragging() ? 0.5 : 1 }),
    });
    return (
      <div ref={dragRef} className='card' style={{ opacity }}>
        {text}
      </div>
    );
  };

  const Spot = ({ type, slot, text, handleDrop }) => {
    const [{ canDrop, isOver }, dropRef] = useDrop({
      accept: type,
      drop: item => {
        handleDrop(slot, item);
      },
      collect: monitor => ({
        isOver: !!monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    });

    let backgroundColor = '#f2f2f2';
    if (canDrop) backgroundColor = '#3db897';
    if (isOver) backgroundColor = '#4bdcb5';

    return (
      <div ref={dropRef} className='spot' style={{ backgroundColor }}>
        {text}
      </div>
    );
  };

  const [number1, setNumber1] = useState(3);
  const [number2, setNumber2] = useState(4);
  const [operator, setOperator] = useState('*');

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='app'>
        {/* math card */}
        <div className='math-card'>
          <Spot
            type='number'
            slot='setNumber1'
            text={number1}
            handleDrop={handleDrop}
          />
          <Spot
            type='number'
            slot='setNumber2'
            text={number2}
            handleDrop={handleDrop}
          />
          <Spot
            type='operator'
            slot='setOperator'
            text={operator}
            handleDrop={handleDrop}
          />
          <div type='number' className='total'>
            {
              eval(`${number1}${operator}${number2}`) // eslint-disable-line
            }
          </div>
        </div>

        <div>
          <div className='cards numbers'>
            {Array(10)
              .fill(0)
              .map((n, i) => (
                <Card type='number' key={i} text={i + 1} />
              ))}
          </div>

          <div className='cards operators'>
            {['*', '-', '+', '/'].map((o, i) => (
              <Card type='operator' key={i} text={o} />
            ))}
          </div>
        </div>
      </div>
    </DndProvider>
  );
}
