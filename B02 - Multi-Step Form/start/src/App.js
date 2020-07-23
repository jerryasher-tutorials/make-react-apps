import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import './App.css';
import SignupForm from './components/SignupForm/SignupForm.js';

export default function App() {
  return (
    <Router>
      <div className='app'>
        <SignupForm />
      </div>
    </Router>
  );
}
