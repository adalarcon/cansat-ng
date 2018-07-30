import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService }       from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService:DataService
  ) { }

  

  ngOnInit() {


  }



}
