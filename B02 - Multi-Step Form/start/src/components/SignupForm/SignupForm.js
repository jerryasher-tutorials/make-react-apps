import React from 'react';
import { Switch, Route } from 'react-router-dom';

import ProfileForm from './ProfileForm';
import SocialForm from './SocialForm';
import Review from './Review';
import StepLinks from './StepLinks';
import { SignupFormProvider } from './SignupFormContext';

export default function SignupForm() {
  return (
    <SignupFormProvider>
      <div className='signup-form'>
        {/* show the steps and links */}
        <StepLinks />
        {/* show the forms */}
        <Switch>
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
      </div>
    </SignupFormProvider>
  );
}
