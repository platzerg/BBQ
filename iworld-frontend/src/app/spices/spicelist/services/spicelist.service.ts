import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import {Spice} from '../../../model/spice';
import {SpiceMix} from '../../../model/spicemix';
import Rub from "../../../model/rub";

@Injectable()
export class SpicelistService {

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

  constructor(private http: Http) {
  }

  getEmployees(): Observable<Spice[]> {
    return this.http.get(encodeURI('http://localhost:8080/iWorld/bbq/rubs/gewuerze'))
      .retry(3)
      .map(response => response.json() as Spice[])
      .catch(SpicelistService.handleError);
  }

  createSpice(spice: Spice): Observable<Spice> {
    console.log("createSpice");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(spice);
    console.log("createSpice" + JSON.parse(body));

    return this.http.post('http://localhost:8080/iWorld/bbq/rubs/gewuerze', body, options)
      .retry(3)
      .map(response => response.json() as Spice)
      .catch(SpicelistService.handleError);
  }

  updateSpice(spice: Spice): Observable<any> {
    console.log("updateSpice");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(spice);
    console.log("updateSpice" + JSON.parse(body));
    return this.http.put('http://localhost:8080/iWorld/bbq/rubs/gewuerze', body, options)
      .retry(3)
      .map(response => response.json())
      .catch(SpicelistService.handleError);
  }

  deleteSpice(id: number): Observable<any> {
    console.log("Delete Spice for id: " + id);
    return this.http.delete('http://localhost:8080/iWorld/bbq/rubs/gewuerze/' + id)
      .map(response => response.json())
      .catch(SpicelistService.handleError);
  }

  createSpiceMix(rubId: number, spiceMix: SpiceMix): Observable<SpiceMix> {
    console.log("createSpiceMix");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(spiceMix);
    console.log("createSpiceMix" + JSON.parse(body));
    return this.http.post('http://localhost:8080/iWorld/bbq/rubs/rub/' + rubId +'/rubmix', body, options)
      .retry(3)
      .map(response => response.json() as SpiceMix)
      .catch(SpicelistService.handleError);
  }

  updateSpiceMix(rubId: number, spiceMix: SpiceMix, rub: Rub): Observable<any> {
    console.log("updateSpice");
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let body = JSON.stringify(spiceMix);
    console.log("createSpiceMix" + JSON.parse(body));
    return this.http.put('http://localhost:8080/iWorld/bbq/rubs/rub/' + rubId +'/rubmix/' +spiceMix.id, body, options)
      .retry(3)
      .map(response => response.json())
      .catch(SpicelistService.handleError);
  }
}
