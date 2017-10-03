import { combineReducers } from 'redux';
import { IAppState } from './../app.state';
import { rubReducer as rubs } from './rubs';
import { spiceReducer as spices } from './spices';


export const reducer = combineReducers<IAppState>({
  rubs,
  spices
});
