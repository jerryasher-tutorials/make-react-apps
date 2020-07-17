import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SiteHeader from './components/SiteHeader';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
// import PrivateRoute from './components/PrivateRoute';
import './App.css';
import { useAuth0 } from './contexts/auth0-context';

export default function App() {
  return (
    <Router>
      <div className='app'>
        {/* site header */}
        <SiteHeader />

        {/* routes */}
        <Switch>
          <Route path='/dashboard'>
            <Dashboard />
          </Route>
          <Route path='/' exact={true}>
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
