import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCurrency } from '../../actions';
import { CurrentCurrency } from '../../types';
import './style.css';

type State = {
  dataNBRB: CurrentCurrency[];
  currencyError: string | null;
};

const Currency: React.FC = () => {
  const dispatch = useDispatch();
  const dataNBRB = useSelector((state: State) => state.dataNBRB);
  const currencyError = useSelector((state: State) => state.currencyError);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (currencyError)
      setErrorMessage('Sorry, currency rates are not available');
    else dispatch(fetchCurrency());
  }, [currencyError, dispatch]);

  return (
    <>
      {errorMessage ? (
        <article className='currency'>
          <div className='error-text'>{errorMessage}</div>
        </article>
      ) : (
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
      )}
    </>
  );
};

export default Currency;
