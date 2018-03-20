
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/User';
import { UsersService } from '../../Services/Users.service';
import { AlertifyService } from '../../Services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../models/pagination';


@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {
Users: User[];
pagination: Pagination;

  constructor(private userService: UsersService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
   // tslint:disable-next-line:no-unused-expression
   this.route.data.subscribe(data => {
     this.Users = data['users'].result;
     this.pagination = data['users'].pagination;
   });
  }
  loadUsers(){
    this.userService.getUsers(this.pagination.CurrentPage, this.pagination.ItemsPerPage)
    .subscribe((res: PaginatedResult<User[]>) =>{
      this.Users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    this.pagination.CurrentPage = event.page;
    this.loadUsers();
  }
}
