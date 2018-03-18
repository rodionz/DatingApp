import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { User } from '../models/User';
import { Injectable } from '@angular/core';
import { UsersService } from '../Services/Users.service';
import { AlertifyService } from '../Services/alertify.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { AuthService } from '../Services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>{

    constructor(private userService: UsersService, private router: Router,
         private alertify: AlertifyService, private authService: AuthService ){}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
         return this.userService.getUser(this.authService.decodedToken.nameid)
         .catch(error => {
             this.alertify.error('Problem retreiving Data');
             this.router.navigate(['/members']);
             return Observable.of(null);
         });
    }

}
