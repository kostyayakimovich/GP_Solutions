import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../actions';
import { CurrentCurrency } from '../../types';
import './style.css';

type State = {
  dataNBRB: CurrentCurrency[];
};

const Currency: React.FC = () => {
  const dispatch = useDispatch();
  const dataNBRB = useSelector((state: State) => state.dataNBRB);

  useEffect(() => {
    dispatch(fetchCurrency());
  }, [dispatch]);

  return (
    <article className='currency'>
      {dataNBRB.length &&
        dataNBRB.map((item) => {
          return (
            <div className='currency-card' key={item.Cur_ID}>
              <p className='currency-name'>{item.Cur_Abbreviation}: </p>
              <p className='currency-value'>
                {item.Cur_OfficialRate.toFixed(2)}
              </p>
            </div>
          );
        })}
    </article>
  );
};

export default Currency;
