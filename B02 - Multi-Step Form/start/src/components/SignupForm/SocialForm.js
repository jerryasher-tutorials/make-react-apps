import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import Animator from './Animator';
import { useSignupForm } from './SignupFormContext';

export default function SocialForm() {
  function onSubmit(data) {
    setSocial(data);
    history.push('/review');
  }

  const { social, setSocial } = useSignupForm();
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  return (
    <Animator>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>whats your social deetz</h2>
        {errors.twitter && 'twitter, ug'}
        <input
          type='text'
          name='twitter'
          placeholder="What's your twitter"
          defaultValue={social.twitter}
          ref={register({ required: false })}
        />
        {errors.facebook && 'double ug, facebook'}
        <input
          type='text'
          name='facebook'
          placeholder="What's your facebook"
          defaultValue={social.facebook}
          ref={register({ required: false })}
        />
        <input type='submit' value='next' />
      </form>
    </Animator>
  );
}
