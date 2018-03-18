import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../Services/Users.service';
import { AlertifyService } from '../../Services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/User';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  constructor(private userService: UsersService,
  private alertify: AlertifyService,
  private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }
   

  loadUser(){
    this.userService.getUser(+this.route.snapshot.params['id'])
    .subscribe((user: User) => {this.user = user; }
     , error => {
       this.alertify.error(error);
     })
    }
}
