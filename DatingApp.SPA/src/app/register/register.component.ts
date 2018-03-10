import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../Services/auth.service';
import { AlertifyService } from '../Services/alertify.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model: any = {};
@Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alert : AlertifyService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.model)
    .subscribe(() => {
      this.alert.success('Registration Sucessfull');
    }, error => {
      this.alert.error(error);
    });
  }

  onCancell() {
    this.cancelRegister.emit();
  }

}
