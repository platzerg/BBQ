import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: Http, private auth: AuthService) { }

  get(url: string) {
    console.log('ApiService get: ' + url);
    return this.request(url, RequestMethod.Get);
  }

  post(url: string, body: Object) {
    console.log('ApiService post: ' + url + ' body: ' + body);
    return this.request(url, RequestMethod.Post, body);
  }

  put(url: string, body: Object) {
    console.log('ApiService put: ' + url + ' body: ' + body);
    return this.request(url, RequestMethod.Put, body);
  }

  delete(url: string) {
    console.log('ApiService delete: ' + url);
    return this.request(url, RequestMethod.Delete);
  }

  request(url: string, method: RequestMethod, body?: Object) {
    console.log('ApiService request: ' + url + ' method: ' + method + ' body: ' + body);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', `Bearer ${this.auth.getToken()}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers
    });

    if (body) {
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);

    return this.http.request(request)
      .map((res: Response) => res.json())
      .catch((res: Response) => this.onRequestError(res));
  }

  onRequestError(res: Response) {
    console.log('ApiService onRequestError: ' + res);
    const statusCode = res.status;
    const body = res.json();

    const error = {
      statusCode: statusCode,
      error: body.error
    };

    console.log(error);

    return Observable.throw(error);
  }

}
