
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../Services/Users.service';
import { AlertifyService } from '../../Services/alertify.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
Users: User[]

  constructor(private userService: UsersService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
   // tslint:disable-next-line:no-unused-expression
   this.route.data.subscribe(data => {
     this.Users = data['users'];
   });
  }

}
