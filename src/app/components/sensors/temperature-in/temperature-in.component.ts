import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-temperature-in',
  templateUrl: './temperature-in.component.html',
})
export class TemperatureInComponent implements OnInit {

  // Temperatura Interior
  // {"type": "lm35", "data": {"temperature": 21.00}}

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
