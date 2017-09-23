import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {RubdetailComponent} from "./rubs/rubdetail/rubdetail.component";

@Injectable()
export class DeactivateGuard implements CanDeactivate<RubdetailComponent> {
  canDeactivate(
    component: RubdetailComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): Observable<boolean>|Promise<boolean>|boolean {
    return component.areFormsSaved();
  }
}
