import { IRubState } from './../app.state';
import C from "../constants";
const INITIAL_STATE: IRubState = {
  all: []
};


export function spiceReducer(state = INITIAL_STATE, action: any): IRubState {
  switch (action.type) {
    case C.ADD_SPICE:
      return { all: [...state.all, action.payload] };
    default:
      return state;
  }
}
