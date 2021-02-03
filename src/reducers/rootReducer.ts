import { news, users } from './defaultState';
import { Action } from '../types';
import {
  SORT_DATE,
  ADD,
  DELETE,
  EDIT,
  SEARCH,
  SORT_AUTHOR,
  LOGIN,
  SIGNIN,
  REMOVE_USER,
  EXIT_USER,
  FETCH_CURRENCY,
} from './types';

const defaultState = {
  news,
  searchString: null,
  searchAuthor: null,
  findNews: [],
  users,
  currentUser: null,
  currency: [],
  dataNBRB: {},
};

function reducer(state = defaultState, action: Action) {
  switch (action.type) {
    case FETCH_CURRENCY: {
      return {
        ...state,
        dataNBRB: action.payload,
      };
    }
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
    case SORT_DATE: {
      return {
        ...state,
        valueSortDate: action.payload,
      };
    }
    case SORT_AUTHOR: {
      return {
        ...state,
        searchAuthor: action.payload.trim(),
      };
    }
    case LOGIN: {
      return {
        ...state,
        currentUser: action.payload.login,
        users: [...state.users, action.payload],
      };
    }
    case SIGNIN: {
      return {
        ...state,
        currentUser: action.payload.login,
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        users: [...state.users.filter((item) => item.login !== action.payload)],
        currentUser: null,
      };
    }
    case EXIT_USER: {
      return {
        ...state,
        currentUser: null,
      };
    }
    default:
      return state;
  }
}

export default reducer;
