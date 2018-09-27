import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bpm',
  templateUrl: './bpm.component.html',
  styleUrls: ['./bpm.component.css']
})
export class BpmComponent implements OnInit {


  // {"type": "b180", "data": {"altitude":40.42,"presion":849.39 }}

  //altitud 0 >> 200 metros  line

  //presion 0 >> 200 bar  gaus

  public canvasWidth = 200
  public needleValue = 65
  public centralLabel = ''
  public name = 'Gauge chart'
  public bottomLabel = '65'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(255, 00, 00)'],
      arcDelimiters: [30],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
  };

  constructor() { }

  ngOnInit() {
  }

}
