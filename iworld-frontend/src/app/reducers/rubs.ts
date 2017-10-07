import { IRubState } from './../app.state';
import C from '../constants';
const INITIAL_STATE: IRubState = {
  all: []
};


export function rubReducer(state = INITIAL_STATE, action: any): IRubState {

  switch (action.type) {
    case C.ADD_RUB:
      return { all: [...state.all, action.payload] };
    case C.GET_ALL_RUBS:
      return { all: [...action.payload] };
    case C.REMOVE_RUB:
      return {
        all: state.all.filter(rub => rub.id !== action.payload.id)
      };
    default:
      return state;
  }

}
