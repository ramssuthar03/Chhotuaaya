import {combineReducers} from 'redux';
import AuthReducer from './reducers/AuthReducer';
import CartReducer from './reducers/CartReducer';
import StyleReducer from './reducers/StyleReducer';
import { chhotuaayaApi } from './services/api';

export const rootReducer = combineReducers({
  [chhotuaayaApi.reducerPath]:chhotuaayaApi.reducer,
  [StyleReducer.name]:StyleReducer.reducer,
  [CartReducer.name]:CartReducer.reducer,
  [AuthReducer.name]:AuthReducer.reducer
});