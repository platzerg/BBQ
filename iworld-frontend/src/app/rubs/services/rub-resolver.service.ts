import Rub from '../../model/rub';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {RubService} from './rub.service';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class RubResolver implements Resolve<Rub> {

  constructor(private rubService: RubService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<Rub> {
    const id = route.params['id'];
    if (id > 0) {
      return this.rubService.getRub(route.params['id']);
    }

  }

}
