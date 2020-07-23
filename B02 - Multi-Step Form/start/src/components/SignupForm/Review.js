import React from 'react';

import { useSignupForm } from './SignupFormContext';

export default function Review() {
  const { profile, social } = useSignupForm();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    alert('submitted!');
  };

  return (
    <form className='review' onSubmit={handleSubmit}>
      <h2>Review your info</h2>
      <p>
        <strong>name</strong>: {profile.name}
      </p>
      <p>
        <strong>email</strong>: {profile.email}
      </p>
      <p>
        <strong>twitter</strong>: {social.twitter}
      </p>
      <p>
        <strong>fb</strong>: {social.facebook}
      </p>

      <input type='submit' value='Submit all your data' />
    </form>
  );
}
