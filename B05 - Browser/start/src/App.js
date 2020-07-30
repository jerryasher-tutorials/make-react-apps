import React, { useReducer } from 'react';
import Tabs from './components/Tabs';
import AddressBar from './components/AddressBar';
import './App.css';

function reducer(state, action) {
  console.log('reducer action', action, ' state', state);
  const { browsers, activeBrowser } = state;
  const { type, payload } = action;
  switch (type) {
    case 'ADD':
      return {
        browsers: [...browsers, ''],
        activeBrowser: browsers.length,
      };

    case 'CHOOSE':
      return { ...state, activeBrowser: payload };

    case 'UPDATE':
      return {
        ...state,
        browsers: [
          ...browsers.slice(0, activeBrowser),
          payload,
          ...browsers.slice(activeBrowser + 1),
        ],
      };
    case 'CLOSE':
      // slice out the closed tab
      const newBrowsers = [
        ...browsers.slice(0, payload),
        ...browsers.slice(payload + 1),
      ];
      // figure out new activeBrowser
      if (payload < activeBrowser) {
        // lost a tab in front, shift activeBrowser down
        return {
          browsers: newBrowsers,
          activeBrowser: activeBrowser - 1,
        };
      } else if (payload === activeBrowser) {
        // choose prior tab
        return {
          browsers: newBrowsers,
          activeBrowser: Math.max(0, activeBrowser - 1),
        };
      } else {
        // lost tab behind
        return {
          browsers: newBrowsers,
          activeBrowser,
        };
      }

    default:
      console.log('unknown action type', type, 'payload', payload);
  }
}

export default function App() {
  const [{ browsers, activeBrowser }, dispatch] = useReducer(reducer, {
    browsers: ['https://learn.chrisoncode.io', 'https://foxnews.com'],
    activeBrowser: 0,
  });

  const chooseBrowser = (idx) => dispatch({ type: 'CHOOSE', payload: idx });
  const addBrowser = () => dispatch({ type: 'ADD' });
  const updateBrowser = (url) => dispatch({ type: 'UPDATE', payload: url });
  const closeBrowser = (index) => dispatch({ type: 'CLOSE', payload: index });

  // misc

  const url = browsers[activeBrowser];
  // console.log('App -> url', url);
  return (
    <div className="app">
      <div className="browser">
        <Tabs
          browsers={browsers}
          activeBrowser={activeBrowser}
          chooseBrowser={chooseBrowser}
          addBrowser={addBrowser}
          closeBrowser={closeBrowser}
        />

        <AddressBar update={updateBrowser} url={url} />

        <div className="viewport">
          {url ? <iframe src={url} title="Stuff" /> : <>New Tab Page</>}
        </div>
      </div>
    </div>
  );
}
