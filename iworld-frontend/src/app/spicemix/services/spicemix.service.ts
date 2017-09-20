import { Injectable } from '@angular/core';

import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {SpiceMix} from '../../model/spicemix';

@Injectable()
export class SpicemixService {

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

  getSpicemixes(): Observable<SpiceMix[]> {
    return this.http.get(encodeURI('http://localhost:8080/iWorld/bbq/rubs/gewuerze'))
      .map(response => response.json() as SpiceMix[])
      .catch(SpicemixService.handleError);
  }

}
