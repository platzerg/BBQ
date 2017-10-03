import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.state';
import { Rub } from '../model/rub';
import {RubService} from '../rubs/services/rub.service';
import C from "../constants";

@Injectable()
export class RubActions {
  constructor(private redux: NgRedux<IAppState>,
              private rubservice: RubService) {}

  addSingle(rub: Rub) {
    this.redux.dispatch({ type: C.ADD_RUB, payload: rub });
  }

  getAllRubs() {
    this.rubservice.getRubs().subscribe(
      allRubs => {
        this.redux.dispatch({ type: C.GET_ALL_RUBS, payload: allRubs });
      },
      error => {
        console.log(error);
      }
    );

  }

}
