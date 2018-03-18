import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/User';
import { Injectable } from '@angular/core';
import { UsersService } from '../Services/Users.service';
import { AlertifyService } from '../Services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable()
export class MemberDetailResolver implements Resolve<User>{

    constructor(private userService: UsersService, private router: Router, private alertify: AlertifyService ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
         return this.userService.getUser(route.params['id'])
         .catch(error => {
             this.alertify.error('Problem retreiving Data');
             this.router.navigate(['/members']);
             return Observable.of(null);
         });
    }

}
