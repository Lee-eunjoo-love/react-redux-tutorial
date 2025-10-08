// #. 루트 리듀서
import { combineReducers } from 'redux';
import counter from './counter';
import todos from './todos';
import sample from './sample';
import loading from '../lib/loading';

const rootReducer = combineReducers({
  counter,
  todos,
  sample,
  loading,
});

export default rootReducer;
