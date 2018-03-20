import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/User';
import { Injectable } from '@angular/core';
import { UsersService } from '../Services/Users.service';
import { AlertifyService } from '../Services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberListResolver implements Resolve<User[]>{
pageSize = 5;
pageNumber = 2;

    constructor(private userService: UsersService, private router: Router, private alertify: AlertifyService ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
         return this.userService.getUsers(this.pageNumber, this.pageSize)
         .catch(error => {
             this.alertify.error('Problem retreiving Data');
             this.router.navigate(['/home']);
             return Observable.of(null);
         });
    }

}
