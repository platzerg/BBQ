import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.state';
import { Rub } from '../model/rub';
import C from "../constants";

@Injectable()
export class SpiceActions {
  constructor(private redux: NgRedux<IAppState>) {}
  addSingle(rub: Rub) {
    this.redux.dispatch({ type: C.ADD_SPICE, payload: rub });
  }
}
