import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
})
export class HumidityComponent implements OnInit {

  //{"type": "dth", "data": {"humidity":73.00,"temperature":24.00}}

  // humidity 0 >> 100 % gause azul

  @Input() humidity:any;

  public canvasWidth = 200
  public needleValue = 65
  public centralLabel = ''
  public name = 'Humidity (%)'
  public bottomLabel = '65'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(166, 206, 227)'],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.needleValue = this.humidity;
    this.bottomLabel = this.humidity;
  }

}
