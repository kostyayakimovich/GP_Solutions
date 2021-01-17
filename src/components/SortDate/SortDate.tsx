import React from 'react';
import './style.css';

type Props = {};

const SortDate: React.FC<Props> = () => {
  return (
    <div className='dropdown'>
      <p className='headline-title'>Sort news by date...</p>
      <select name='one' className='dropdown-select'>
        <option value='1'>Sort Newest to Oldest</option>
        <option value='2'>Sort Oldest to Newest</option>
      </select>
    </div>
  );
};

export default SortDate;
