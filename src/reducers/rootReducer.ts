import { news, users } from './defaultState';
import { Action } from '../types';
import {
  SORT_DATE,
  ADD,
  DELETE,
  EDIT,
  SEARCH,
  SORT_AUTHOR,
  CREATE,
  SIGNIN,
  REMOVE_USER,
  EXIT_USER,
  FETCH_CURRENCY,
  APPROVE_NEWS,
  REJECT_NEWS,
  CHANGE_ALL_NEWS,
  ADD_RSS,
  CURRENCY_ERROR,
  RSS_ERROR,
} from './types';

type DefaultState = {
  news: {
    author: string;
    body: string;
    dateCreate: string;
    id: string;
    title: string;
  }[];
  searchString: string | null;
  searchAuthor: string | null;
  currencyError: string | null;
  rssError: string | null;
  users: {
    login: string;
    email: string;
    password: string;
  }[];
  currentUser: {} | null;
  dataNBRB: {} | null;
  unapprovedNews:
    | {
        author: string;
        body: string;
        dateCreate: string;
        id: string;
        title: string;
      }[]
    | [];
};

const defaultState: DefaultState = {
  news,
  currencyError: null,
  rssError: null,
  searchString: null,
  searchAuthor: null,
  users,
  currentUser: null,
  dataNBRB: {},
  unapprovedNews: [],
};

function reducer(state = defaultState, action: Action) {
  switch (action.type) {
    case FETCH_CURRENCY: {
      return {
        ...state,
        dataNBRB: action.payload,
      };
    }

    case CURRENCY_ERROR: {
      return {
        ...state,
        currencyError: action.payload,
      };
    }

    case RSS_ERROR: {
      return {
        ...state,
        rssError: action.payload,
      };
    }

    case APPROVE_NEWS:
      return {
        ...state,
        news: [action.payload, ...state.news],
        unapprovedNews: [
          ...state.unapprovedNews.filter(
            (item) => item.id !== action.payload.id
          ),
        ],
      };
    case REJECT_NEWS:
      return {
        ...state,
        unapprovedNews: [
          ...state.unapprovedNews.filter(
            (item) => item.id !== action.payload.id
          ),
        ],
      };
    case CHANGE_ALL_NEWS:
      return {
        ...state,
        news: action.payload
          ? [...state.unapprovedNews, ...state.news]
          : [...state.news],
        unapprovedNews: [],
      };
    case ADD:
      return {
        ...state,
        unapprovedNews: [action.payload, ...state.unapprovedNews],
      };

    case ADD_RSS:
      return {
        ...state,
        unapprovedNews: [...action.payload, ...state.unapprovedNews],
      };

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
    case CREATE: {
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
        currentUser: null,
        users: [...state.users.filter((item) => item.login !== action.payload)],
      };
    }
    case EXIT_USER: {
      return {
        ...state,
        currentUser: action.payload,
      };
    }
    default:
      return state;
  }
}

export default reducer;
