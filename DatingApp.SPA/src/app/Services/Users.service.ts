import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { map } from 'rxjs/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { AuthHttp } from 'angular2-jwt';


@Injectable()
export class UsersService {
baseUrl = environment.apiUrl;
constructor(private authhttp: AuthHttp) { }




getUsers(): Observable<User[]> {
   return this.authhttp.get(this.baseUrl + 'users')
   .map(response => <User[]>response.json())
   .catch(this.handleError);
}
getUser(id):Observable<User>{
    return this.authhttp.get(this.baseUrl + 'users/' + id)
    .map(response => <User>response.json())
    .catch(this.handleError);
}

private handleError(error: any) {

    const applicationError = error.headers.get('Application-Error');
    if (applicationError) {
       return Observable.throw(applicationError);
    }

    const serverError = error.json();
    let modelStateErrors = '';

    if (serverError) {
        for (const key in serverError) {
            if (serverError[key]) {
                modelStateErrors += serverError[key] + '\n';
            }
        }
    }
    return Observable.throw(
       modelStateErrors || 'Server error'
    );
  }


}

