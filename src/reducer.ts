import { Cmd, loop, LoopReducer } from 'redux-loop';
import { Actions } from './types/actions.type';
import { Failure, Loading, Success } from './types/api.type';
import { Picture } from './types/picture.type';
import * as O from 'fp-ts/Option';
import { failure, loading, success } from './api';
import { cmdFetch } from './commands';
import { fetchCatsRequest } from './actions';

export type State = {
  counter: number;
  pictures: Loading | Success | Failure;
  pictureSelected: O.Option<Picture>;
};

export const defaultState: State = {
  counter: 3,
  pictures: loading(), 
  pictureSelected: O.none,
};



export const counterSelector = (state: State) => state.counter;
export const getSelectedPicture = (state: State) => state.pictureSelected;
export const picturesSelector = (state: State) => state.pictures;


export const reducer: LoopReducer<State, Actions> = (state, action) => {
  if (!state) return defaultState;
  switch (action.type) {
    case 'INCREMENT': {
      const newCounter = state.counter + 1;
      return loop(
        { ...state, counter: newCounter },
        Cmd.action(fetchCatsRequest(newCounter)) 
      );
    }
    case 'DECREMENT': {
      if (state.counter <= 3) return state;
      const newCounter = state.counter - 1;
      return loop(
        { ...state, counter: newCounter },
        Cmd.action(fetchCatsRequest(newCounter)) 
      );
    }
    case 'SELECT_PICTURE':
      return { ...state, pictureSelected: O.some(action.picture) };
    case 'CLOSE_MODAL':
      return { ...state, pictureSelected: O.none };
    case 'FETCH_CATS_REQUEST':
      return loop(
        { ...state, pictures: loading() },
        cmdFetch(action)
      );
    case 'FETCH_CATS_COMMIT':
      return { ...state, pictures: success(action.payload) }; 
    case 'FETCH_CATS_ROLLBACK':
      return { ...state, pictures: failure(action.error.message) }; 
    default:
      return state;
  }
};