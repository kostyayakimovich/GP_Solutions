import { news } from './defaultState';
import { Action } from '../types';

const defaultState = {
  news,
};

function reducer(state = defaultState, action: Action) {
  switch (action.type) {
    case 'ADD':
      return { ...state, news: [action.payload, ...state.news] };
    case 'DELETE': {
      return {
        ...state,
        news: state.news.filter(({ title }) => title !== action.payload.title),
      };
    }
    case 'EDIT': {
      return {
        ...state,
        news: state.news.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    }
    default:
      return state;
  }
}

export default reducer;
