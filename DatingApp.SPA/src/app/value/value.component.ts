import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http/src/http';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: any;
  constructor(private http: Http ) { }

  ngOnInit() {
  }
 
 getValues() {
this.http.get('');
}

}
