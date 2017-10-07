import { Injectable } from '@angular/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../app.state';
import { Rub } from '../model/rub';
import {RubService} from '../rubs/services/rub.service';
import C from '../constants';

@Injectable()
export class RubActions {
  constructor(private redux: NgRedux<IAppState>,
              private rubservice: RubService) {}

  addRub(rub: Rub) {
    this.redux.dispatch({ type: C.ADD_RUB, payload: rub });
  }

  removeRub(rub: Rub) {
    this.rubservice.deleteRub(rub.id)
      .finally(() => {
      })
      .subscribe(
        () => {
          this.redux.dispatch({ type: C.REMOVE_RUB, payload: rub });
          console.log('Rub was successfully removed wiht Redux');
        },
        error => console.log(error)
      );

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
