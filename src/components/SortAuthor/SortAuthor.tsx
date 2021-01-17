import React from 'react';
import Search from '../../assets/images/search.png';
import './style.css';

type Props = {};

const SortAuthor: React.FC<Props> = () => {
  return (
    <div className='sortAuthor'>
      <p className='headline-title'>Sort news by author...</p>
      <div className='input-headline-wrapper'>
        <input
          className='input-headline'
          type='text'
          placeholder='Find news by author…'
        />
        <img className='search-icon-headline' src={Search} alt='search' />
      </div>
    </div>
  );
};

export default SortAuthor;
