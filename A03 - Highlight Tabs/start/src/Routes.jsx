import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Features from './pages/Features.jsx';

export default function Router() {
  return (
    <Switch>
      <Route path='/about'>{<About />}</Route>
      <Route path='/features'>{<Features />}</Route>
      <Route path='/' exact={true}>
        <Home />
      </Route>
    </Switch>
  );
}
