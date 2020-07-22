import React, { useState } from 'react';
import useInterval from '@use-it/interval';
import { motion } from 'framer-motion';
import './App.css';

const messages = [
  { text: 'How do I get better at React?' },
  { text: 'Just build something!' },
  { text: 'OK! What should I build?' },
  { text: 'Iono. Just Google it?' },
  { text: 'Oh! This course looks cool!' },
  { text: 'Send me the link?!' },
  { text: '20ReactApps.com!' },
];

export default function App() {
  const [messageToShow, setMessageToShow] = useState(0);

  useInterval(() => {
    setMessageToShow((messageToShow) => messageToShow + 1);
  }, 2000);

  return (
    <div className='app'>
      <div className='walkthrough'>
        {messages.map((message, index) => {
          if (messageToShow + 1 === index) {
            return <Dots key={index} index={index} />;
          }

          if (messageToShow <= index) {
            return <div key={index}></div>;
          }
          return <Message key={index} message={message} />;
        })}
      </div>
    </div>
  );
}

const Message = ({ message }) => {
  return (
    <motion.div
      initial={{ rotate: -5, scale: 0.2 }}
      animate={{ scale: 1.0, rotate: 0 }}
      transition={{ duration: 0.1 }}
      className='message'
    >
      {/* eslint-disable-next-line */}
      <div className='avatar'>😎</div>
      <div className='text'>{message.text}</div>
      {/* eslint-disable-next-line */}
      <div className='avatar'>👀</div>
    </motion.div>
  );
};

const Dots = ({ index }) => {
  const leftRight = index % 2 ? 'is-left' : 'is-right';

  return (
    <motion.div
      initial={{ rotate: 10, scale: 0.0 }}
      animate={{ scale: 1.0, rotate: 0 }}
      className={`typing ${leftRight}`}
    >
      <div className='dots'>
        <div />
        <div />
        <div />
      </div>
    </motion.div>
  );
};
