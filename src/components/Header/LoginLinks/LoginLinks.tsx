import React from 'react';
import { LoginModalType } from '../../../types';
import './style.css';

type Props = {
  openLoginModal: (type: LoginModalType) => void;
};

const LoginLinks: React.FC<Props> = ({ openLoginModal }) => {
  return (
    <div className='login-links'>
      <p
        className='login-text'
        onClick={() => openLoginModal(LoginModalType.Create)}
      >
        Create
      </p>
      <p
        className='signin-text'
        onClick={() => openLoginModal(LoginModalType.Signin)}
      >
        Sign in
      </p>
    </div>
  );
};

export default LoginLinks;
