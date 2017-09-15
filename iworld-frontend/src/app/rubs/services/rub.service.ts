import { Injectable } from '@angular/core';

import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Rub} from '../../model/rub';

@Injectable()
export class RubService {

  constructor(private http: Http) {
  }

  private static handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      if (error.status === 404) {
        errMsg = `Resource ${error.url} was not found`;
      } else {
        const body = error.json() || '';
        const err = body.error || JSON.stringify(body);
        errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

  getRubs(): Observable<Rub[]> {
    return this.http.get(encodeURI('http://localhost:8080/iWorld/bbq/rubs/all'))
      .map(response => response.json() as Rub[])
      .catch(RubService.handleError);
  }

  getRub(id: number): Observable<Rub> {
    return this.http.get(encodeURI('http://localhost:8080/iWorld/bbq/rubs/showbyid/' +id))
      .map(response => response.json() as Rub)
      .catch(RubService.handleError);
  }

}
