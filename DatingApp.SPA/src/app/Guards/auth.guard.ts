import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../Services/auth.service';
import { AlertifyService } from '../Services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {

constructor(private authservice: AuthService, private router: Router, private alertify: AlertifyService) {}


  canActivate(
   ): Observable<boolean> | Promise<boolean> | boolean {
     if(this.authservice.decodedToken) {
      return true;
     }
    this.alertify.error('You need to be logged in to access this area');
    this.router.navigate(['/home'])
    return false;
  }
}
