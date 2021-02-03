import React from 'react';
import './style.css';

type Props = {
  onClick?: () => void;
  buttonName: string;
  typeBtn: 'button' | 'submit' | 'reset';
};

const Button: React.FC<Props> = ({ buttonName, onClick, typeBtn }) => {
  return (
    <button className='btn' onClick={onClick} type={typeBtn}>
      {buttonName}
    </button>
  );
};

export default Button;
