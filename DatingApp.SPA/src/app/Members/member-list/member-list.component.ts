
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../Services/Users.service';
import { AlertifyService } from '../../Services/alertify.service';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
Users: User[]

  constructor(private userService: UsersService, private alertify: AlertifyService) { }

  ngOnInit() {
    this.userService.getUsers()
    .subscribe((users: User[]) => {this.Users = users},
    error => {this.alertify.error(error)});
  }

}
