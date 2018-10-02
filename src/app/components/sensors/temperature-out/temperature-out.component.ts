import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-temperature-out',
  templateUrl: './temperature-out.component.html',
})
export class TemperatureOutComponent implements OnInit {

  //{"type": "dth", "data": {"humidity":73.00,"temperature":24.00}}
  //temperature 0 >> 100 gc verde amarillo rojo gaus

  @Input() temperature:any;

  public canvasWidth = 200
  public needleValue = 33;
  public centralLabel = ''
  public name = 'Temperature (℃)'
  public bottomLabel = '65'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ["rgb(61,204,91)","rgb(239,214,19)","rgb(255,84,84)"],
    	arcDelimiters: [30,70],
      rangeLabel: ['0', '100'],
      needleStartValue: 50,
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.needleValue = this.temperature;
    this.bottomLabel = this.temperature;
  }

}
