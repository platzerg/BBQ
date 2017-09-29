import { Injectable } from '@angular/core';

import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
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
      .retry(3)
      .map(response => response.json() as Rub[])
      .catch(RubService.handleError);
  }

  getRub(id: number): Observable<Rub> {
    return this.http.get(encodeURI('http://localhost:8080/iWorld/bbq/rubs/' +id))
      .retry(3)
      .map(response => response.json() as Rub)
      .catch(RubService.handleError);
  }
  getRubTemplate(): Observable<Rub> {
    return this.http.get(encodeURI('http://localhost:8080/iWorld/bbq/rubs/rub/template'))
      .map(response => response.json() as Rub)
      .catch(RubService.handleError);
  }

  updateRub(rub: Rub): Observable<Rub> {
    console.log('update Rub');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(rub);
    console.log('createSpice' + JSON.parse(body));
    return this.http.put('http://localhost:8080/iWorld/bbq/rubs/' +rub.id, body, options)
      .retry(3)
      .map(response => response.json())
      .catch(RubService.handleError);
  }

  createRub(rub: Rub): Observable<Rub> {
    console.log('createRub');
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(rub);
    console.log('createRub' + JSON.parse(body));

    return this.http.post('http://localhost:8080/iWorld/bbq/rubs/add', body, options)
      .retry(3)
      .map(response => response.json() as Rub)
      .catch(RubService.handleError);
  }

  deleteRub(id: number): Observable<any> {
    console.log('Delete Rub for id: ' + id);
    return this.http.delete('http://localhost:8080/iWorld/bbq/rubs/delete/' + id)
      .retry(3)
      .map(response => response.json())
      .catch(RubService.handleError);
  }

  deleteSpiceMix(rubid: number, id: number): Observable<any> {
    console.log('Delete SpiceMix for id: ' + id + ' for rub: ' + rubid);
    return this.http.delete('http://localhost:8080/iWorld/bbq/rubs/' + rubid +'/gewuerzmischungen/' + id)
      .retry(3)
      .map(response => response.json())
      .catch(RubService.handleError);
  }

}
