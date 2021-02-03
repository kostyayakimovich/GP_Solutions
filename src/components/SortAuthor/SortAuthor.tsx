import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SORT_AUTHOR } from '../../reducers/types';
import { CurrentNews } from '../../types';
import './style.css';

type State = {
  news: CurrentNews[];
};

const SortAuthor: React.FC = () => {
  const [authors, setAuthors] = useState([]);
  const dispatch = useDispatch();
  const news = useSelector((state: State) => state.news);
  useEffect(() => {
    const getAuthors = news.reduce((acc: any, item) => {
      if (!acc.includes(item.author)) {
        acc = [...acc, item.author];
      }
      return acc;
    }, []);
    setAuthors(getAuthors.sort());
  }, [news]);
  const handleChange = useCallback(
    (e) => {
      dispatch({
        type: SORT_AUTHOR,
        payload: e.target.value,
      });
    },
    [dispatch]
  );

  return (
    <div className='sortAuthor'>
      <p className='headline-title'>Sort news by author...</p>
      <div className='dropdown'>
        <select
          name='author'
          className='dropdown-select'
          onChange={handleChange}
        >
          <option value=''>All news </option>
          {authors.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default SortAuthor;
