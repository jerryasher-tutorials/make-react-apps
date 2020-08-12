import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import Gandalf from '../img/gandalf.png';

export default function Home() {
  const { isAuthenticated } = useAuth0();
  return (
    <div className="page home">
      <div>
        <img src={Gandalf} alt="Gandalf" />
        <h2>
          {isAuthenticated
            ? 'Have you found the ring yet?'
            : 'You Shall Not Pass!!!'}
        </h2>
      </div>
    </div>
  );
}
