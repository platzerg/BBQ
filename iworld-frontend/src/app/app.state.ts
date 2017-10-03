import { Rub } from './model/rub';

export interface IAppState {
  rubs: IRubState;
  cart: ICartState;
}
export interface IRubState {
  all: Rub[];
}

export interface ICartState {
  items: Rub[];
  total: number;
}
