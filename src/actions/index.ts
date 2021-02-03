import { FETCH_CURRENCY } from '../reducers/types';
import { CURRENCY_CODES } from '../rootConstants';

export const setCurrency = (dataFromNBRB: any) => {
  return {
    type: FETCH_CURRENCY,
    payload: dataFromNBRB,
  };
};

export const fetchCurrency = () => async (dispatch: any) => {
  const currency = await Promise.all(
    CURRENCY_CODES.map(async (item) => {
      const response = await fetch(
        ` https://www.nbrb.by/api/exrates/rates/${item}?parammode=1`
      );
      const dataAnswer = await response.json();
      return dataAnswer;
    })
  );

  dispatch(setCurrency(currency));
};
