import React from 'react';
import { RegisterType } from '../../../types';
import './style.css';

type Props = {
  openRegister: (type: RegisterType) => void;
};

const LoginLinks: React.FC<Props> = ({ openRegister }) => {
  return (
    <div className='login-links'>
      <p
        className='login-text'
        onClick={() => openRegister(RegisterType.Login)}
      >
        Log in
      </p>
      <p
        className='signin-text'
        onClick={() => openRegister(RegisterType.Signin)}
      >
        Sign in
      </p>
    </div>
  );
};

export default LoginLinks;
