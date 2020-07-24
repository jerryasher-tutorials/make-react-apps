import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Animator from './Animator';
import { useSignupForm } from './SignupFormContext';

// regex for email
// https://stackoverflow.com/a/46181/608970

// const EMAIL_RE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const EMAIL_RE = /./;

export default function ProfileForm() {
  function onSubmit(data) {
    console.log(data);
    setProfile(data);
    history.push('/social');
  }

  const { profile, setProfile } = useSignupForm();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();

  return (
    <Animator>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Tell us about yourself</h2>
        {errors.name && 'name is required'}
        <input
          type='text'
          name='name'
          placeholder="What's your name"
          defaultValue={profile.name}
          ref={register({ required: true })}
        />
        {errors.email && 'email is required'}
        <input
          type='text'
          name='email'
          placeholder="What's your email"
          defaultValue={profile.email}
          ref={register({ required: true, pattern: EMAIL_RE })}
        />
        <input type='submit' value='next' />
      </form>
    </Animator>
  );
}
