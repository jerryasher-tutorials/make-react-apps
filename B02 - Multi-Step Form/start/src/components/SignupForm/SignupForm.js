import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import ProfileForm from './ProfileForm';
import SocialForm from './SocialForm';
import Review from './Review';
import StepLinks from './StepLinks';
import { SignupFormProvider } from './SignupFormContext';

export default function SignupForm() {
  const location = useLocation();
  return (
    <SignupFormProvider>
      <div className='signup-form'>
        {/* show the steps and links */}
        <StepLinks />
        <AnimatePresence>
          {/* show form based on route */}
          <Switch location={location} key={location.pathname}>
            <Route exact path='/' component={ProfileForm}>
              <ProfileForm />
            </Route>
            <Route path='/social' component={SocialForm}>
              <SocialForm />
            </Route>
            <Route path='/review' component={Review}>
              <Review />
            </Route>
          </Switch>
        </AnimatePresence>
      </div>
    </SignupFormProvider>
  );
}
