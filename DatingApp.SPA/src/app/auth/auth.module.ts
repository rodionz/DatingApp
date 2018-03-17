import {  NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { Http, RequestOptions } from '@angular/http';
import { AuthHttp, AuthConfig } from 'angular2-jwt';


export function authHttpServiceFactory(http: Http,
options: RequestOptions) {
  return new AuthHttp(new AuthConfig({
    tokenName: 'token',
    // tslint:disable-next-line:whitespace
    tokenGetter:(() => localStorage.getItem('token')),
    globalHeaders: [{'Content-Type': 'application/json'}],
  }), http, options);
  }

@NgModule({
  providers: [
    {
      provide: AuthHttp,
       useFactory: authHttpServiceFactory,
       // tslint:disable-next-line:no-trailing-whitespace
       deps: [Http, RequestOptions]  
    }
  })
export class AuthModule { }
