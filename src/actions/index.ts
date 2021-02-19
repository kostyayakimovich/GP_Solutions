import {
  ADD_RSS,
  FETCH_CURRENCY,
  CURRENCY_ERROR,
  RSS_ERROR,
} from '../reducers/types';
import { CURRENCY_CODES } from '../rootConstants';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

const xml2js = require('xml2js');
const getDate = () => moment().format('dddd MMMM D, h:mm:ss');
export const setCurrency = (dataFromNBRB: any) => {
  return {
    type: FETCH_CURRENCY,
    payload: dataFromNBRB,
  };
};

export const setDataErrorCurrency = (error: string) => {
  return {
    type: CURRENCY_ERROR,
    payload: error,
  };
};

export const setDataErrorRss = (error: string) => {
  return {
    type: RSS_ERROR,
    payload: error,
  };
};

export const fetchCurrency = () => async (dispatch: any) => {
  try {
    const currency = await Promise.all(
      CURRENCY_CODES.map(async (item) => {
        const response = await fetch(
          `https://www.nbrb.by/api/exrates/rates/${item}?parammode=1`
        );
        const dataAnswer = await response.json();
        return dataAnswer;
      })
    );
    dispatch(setDataErrorCurrency(''));
    dispatch(setCurrency(currency));
  } catch (e) {
    dispatch(setDataErrorCurrency(e));
  }
};

export const getDataRss = async (dispatch: any, url: string) => {
  try {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const response = await fetch(proxyurl + url);
    const data = await response.text();

    xml2js.parseString(data, (err: any, result: any) => {
      if (err) {
        throw err;
      }
      const news = result.rss.channel[0].item;
      const changedNews = [
        ...news.reduce((acc: any, item: any) => {
          acc = [
            ...acc,
            {
              author: 'Admin',
              body: `${item.description[0]}`,
              dateCreate: getDate(),
              id: uuidv4(),
              title: `${item.title[0]}`,
            },
          ];
          return acc;
        }, []),
      ];
      dispatch(setDataErrorRss(''));
      dispatch({
        type: ADD_RSS,
        payload: Object.values(changedNews),
      });
    });
  } catch (e) {
    dispatch(setDataErrorRss(e));
  }
};
