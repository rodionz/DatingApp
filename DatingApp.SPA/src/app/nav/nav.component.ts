import { Component, OnInit } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  constructor(private auth : AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
  this.auth.login(this.model)
  .subscribe(data => {console.log('Login Success!')},
  error => {console.log('Login Failure!')}
   )
  }

  onLogout(){
   this.auth.userToken = null;
   localStorage.removeItem('token');
   console.log("Logged Out");
  }

  LoggedIn(){
   const token = localStorage.getItem('token');
   return !!token;
  }
}
