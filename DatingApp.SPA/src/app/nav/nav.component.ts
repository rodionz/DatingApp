import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { AlertifyService } from '../Services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private auth : AuthService, private alert : AlertifyService) { }

  ngOnInit() {
  }

  onSubmit(){
  this.auth.login(this.model)
  .subscribe(data => {this.alert.success('Login Success!')},
  error => {this.alert.error(error)}
   )
  }

  onLogout(){
   this.auth.userToken = null;
   localStorage.removeItem('token');
   this.alert.message('Logged Out');
  }

  LoggedIn(){
   const token = localStorage.getItem('token');
   return !!token;
  }
}
