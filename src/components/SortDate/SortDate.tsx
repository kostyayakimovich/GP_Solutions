import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { SORTDATE } from '../../reducers/types';
import './style.css';

const SortDate: React.FC = () => {
  const dispatch = useDispatch();
  const handleChange = useCallback(
    (e) => {
      dispatch({
        type: SORTDATE,
        payload: e.target.value,
      });
    },
    [dispatch]
  );

  return (
    <div className='dropdown'>
      <p className='headline-title'>Sort news by date...</p>
      <select name='one' className='dropdown-select' onChange={handleChange}>
        <option value=''>...</option>
        <option value='DESC'>Sort Newest to Oldest</option>
        <option value='ASC'>Sort Oldest to Newest</option>
      </select>
    </div>
  );
};

export default SortDate;
