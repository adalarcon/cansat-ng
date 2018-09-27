import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dph',
  templateUrl: './dph.component.html',
  styleUrls: ['./dph.component.css']
})
export class DphComponent implements OnInit {

  //{"type": "dth", "data": {"humidity":73.00,"temperature":24.00}}

  // temperatura exterior
  // humidity 0 >> 100 % gause azul

  //temperature 0 >> 100 gc verde amarillo rojo gaus

  constructor() { }

  ngOnInit() {
  }

}
