import { FETCH_CURRENCY } from '../reducers/types';
import { CURRENCY_CODES } from '../rootConstants';

export const putDataNBRB = (dataFromNBRB: any) => {
  return {
    type: FETCH_CURRENCY,
    payload: dataFromNBRB,
  };
};

export const loadDataNBRB = () => async (dispatch: any) => {
  const currencyNBRB = await Promise.all(
    CURRENCY_CODES.map(async (item) => {
      const response = await fetch(
        ` https://www.nbrb.by/api/exrates/rates/${item}?parammode=1`
      );
      const dataAnswer = await response.json();
      return dataAnswer;
    })
  );

  dispatch(putDataNBRB(currencyNBRB));
};
