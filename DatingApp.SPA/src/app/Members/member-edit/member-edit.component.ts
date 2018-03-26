import { AuthService } from './../../Services/auth.service';
import { AlertifyService } from './../../Services/alertify.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsersService } from '../../Services/Users.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  user: User;
  @ViewChild('editForm') editForm: NgForm;
  constructor(private route: ActivatedRoute, 
    private alertify: AlertifyService,
    private userService: UsersService,
    private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
  }

  updateUser(){
     this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
     .subscribe(next => {
      this.alertify.success("Profile Updated Successfully");
      this.editForm.reset(this.user);
     }, error => {
       this.alertify.error(error);
     })
  }
}
