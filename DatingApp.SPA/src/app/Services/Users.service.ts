import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/User';
import { map } from 'rxjs/operator/map';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


@Injectable()
export class UsersService {
baseUrl = environment.apiUrl;
constructor(private http: Http) { }




getUsers(): Observable<User[]> {
   return this.http.get(this.baseUrl + 'users', this.Jwt())
   .map(response => <User[]>response.json())
   .catch(this.handleError);
}


private Jwt(){
    const token = localStorage.getItem('token');
     if(token){
         const headers = new Headers({'Authorization' : 'Bearer' + token});
         headers.append('Content-type', 'Application/json');
         return new RequestOptions({headers : headers});
     }
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

