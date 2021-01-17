import React from 'react';
import './style.css';

type Props = {};

const Currency: React.FC<Props> = () => {
  return (
    <article className='currency'>
      <div className='currency-card'>
        <p className='currency-name'>USD:</p>
        <p className='currency-value'>2560,20</p>
      </div>
      <div className='currency-card'>
        <p className='currency-name'>EUR:</p>
        <p className='currency-value'>2560,20</p>
      </div>
      <div className='currency-card'>
        <p className='currency-name'>RUB:</p>
        <p className='currency-value'>2560,20</p>
      </div>
      <div className='currency-card'>
        <p className='currency-name'>PZ:</p>
        <p className='currency-value'>2560,20</p>
      </div>
      <div className='currency-card'>
        <p className='currency-name'>UH:</p>
        <p className='currency-value'>2560,20</p>
      </div>
    </article>
  );
};

export default Currency;
