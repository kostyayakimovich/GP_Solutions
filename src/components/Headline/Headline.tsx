import React from 'react';
import Currency from '../Currency';
import SortAuthor from '../SortAuthor';
import SortDate from '../SortDate';
import './style.css';

const Headline: React.FC = () => {
  return (
    <section className='headline'>
      <Currency />
      <div className='sort-block'>
        <SortAuthor />
        <SortDate />
      </div>
    </section>
  );
};

export default Headline;
