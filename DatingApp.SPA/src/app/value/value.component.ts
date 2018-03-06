import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Response } from '@angular/http/src/static_response';


@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;
  constructor(private http: Http ) { }

  ngOnInit() {
    this.getValues();
  }

 getValues() {
     this.http.get('http://localhost:5000/api/values')
     .subscribe(response => {this.values = response.json()});
}

}
