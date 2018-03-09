import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../Services/auth.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
model : any = {};
@Output() cancelRegister = new EventEmitter();
  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.register(this.model)
    .subscribe(() => {
      console.log('Registration Sucessfull');
    }, error => {
      console.log(error);
    });
  }

  onCancell(){
    this.cancelRegister.emit();
  }

}
