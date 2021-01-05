import React from 'react';
import './style.css';

type Props = {
  onClick: () => void;
  buttonName: string;
};

const Button: React.FC<Props> = ({ buttonName, onClick }) => {
  return (
    <button className='btn' onClick={onClick}>
      {buttonName}
    </button>
  );
};

export default Button;
