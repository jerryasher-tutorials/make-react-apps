import React, { useState, useEffect, useCallback } from 'react';
import { useSpeechSynthesis } from 'react-speech-kit';

export default function App() {
  const d = new Date();
  const seconds = d.getSeconds();
  const millis = d.getMilliseconds();

  const [ticktock, setTickTock] = useState(0);
  const [talk, setTalk] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      let tickr;
      setTickTock((tick) => {
        tickr = tick + 1;
        return tickr;
      });
      // console.log('tick', tickr);
    }, 256); // tick 4 times a second
  }, [ticktock, talk]);

  const { speak, speaking, supported } = useSpeechSynthesis();

  const doSpeak = useCallback((...p) => speak(...p), []);

  useEffect(() => {
    // speak every 5 seconds
    console.log('speak when divisible by 5', seconds);
    if (seconds % 5 === 0) {
      if (talk) {
        doSpeak({ text: seconds.toString() });
      }
    }
  }, [seconds, talk, doSpeak]);
  // Line 26:6:  React Hook useEffect has a missing dependency: 'speak
  // but speak is a bad thing to add here!

  const startTalk = () => {
    setTalk(true);
  };
  const stopTalk = () => {
    setTalk(false);
  };

  function pad(n) {
    return n.toString().padStart(2, '0');
  }

  return (
    <div>
      <div>
        {d.getHours()}:{pad(d.getMinutes())}:{pad(seconds)}:{millis}
      </div>

      {!talk && <button onClick={startTalk}>Turn speak on</button>}
      {talk && <button onClick={stopTalk}>Turn speak off</button>}

      <h3>{!supported && 'not '} supported</h3>
      <h3>I am {!speaking && 'not '} speaking</h3>
    </div>
  );
}
