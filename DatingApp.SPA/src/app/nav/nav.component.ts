import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { AlertifyService } from '../Services/alertify.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],

})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private auth: AuthService, private alert: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
  this.auth.login(this.model)
  .subscribe(data => {this.alert.success('Login Success!')},
  error => {this.alert.error(error)},
  () => {
   this.router.navigate(['/members']);
  }
   )}

  onLogout() {
   this.auth.userToken = null;
   localStorage.removeItem('token');
   this.alert.message('Logged Out');
   this.router.navigate(['/home']);
  }

  LoggedIn() {
   return this.auth.loggedIn();
  }
}
