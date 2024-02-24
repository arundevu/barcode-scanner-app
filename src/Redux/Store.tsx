import { createStore, combineReducers } from 'redux';
import cartReducer from './Reducers';

const rootReducer = combineReducers({
  data: cartReducer
});

const store = createStore(rootReducer);

export default store;