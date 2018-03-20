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
import { PaginatedResult } from '../models/pagination';


@Injectable()
export class UsersService {
baseUrl = environment.apiUrl;
constructor(private authhttp: AuthHttp) { }




getUsers(page?: number, itemsPerPage?: number){

    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
    // tslint:disable-next-line:prefer-const
    let queryString = '?';

    if(page != null && itemsPerPage != null){
        queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage;
    }

    return this.authhttp
    .get(this.baseUrl + 'users' + queryString)
   .map((response: Response) => {
       paginatedResult.result = response.json();
       if(response.headers.get('Pagination') != null){
           paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
       }

       return paginatedResult;
   })
   .catch(this.handleError);
}



getUser(id): Observable<User> {
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

