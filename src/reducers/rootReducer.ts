import { news } from './defaultState';
import { Action } from '../types';
import { SORTDATE, ADD, DELETE, EDIT, SEARCH, SORTAUTHOR } from './types';

const defaultState = {
  news,
  searchString: null,
  searchAuthor: null,
  findNews: [],
};

function reducer(state = defaultState, action: Action) {
  switch (action.type) {
    case ADD:
      return { ...state, news: [action.payload, ...state.news] };
    case DELETE: {
      return {
        ...state,
        news: state.news.filter(({ id }) => id !== action.payload.id),
      };
    }
    case EDIT: {
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
    case SEARCH: {
      return {
        ...state,
        searchString: action.payload.trim(),
      };
    }
    case SORTDATE: {
      return {
        ...state,
        valueSortDate: action.payload,
      };
    }
    case SORTAUTHOR: {
      return {
        ...state,
        searchAuthor: action.payload.trim(),
      };
    }
    default:
      return state;
  }
}

export default reducer;
