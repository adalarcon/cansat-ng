import { Component, OnInit, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-speed',
  templateUrl: './speed.component.html',
})
export class SpeedComponent implements OnInit, OnChanges {

  //f_speed_kmph line
  @Input() gps:any;

  constructor() { }

  speed: number = 0;

  public canvasWidth = 200
  public needleValue = 0;
  public centralLabel = ''
  public name = 'Speed (m/s)'
  public bottomLabel = '0'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ["rgb(61,204,91)","rgb(239,214,19)","rgb(255,84,84)"],
    	arcDelimiters: [30,70],
      rangeLabel: ['0', '30'],
      needleStartValue: 0,
  };

  ngOnInit() {
  }

  ngOnChanges(){
    if(this.gps){
      this.needleValue = (this.gps.f_speed_kmph * 100 /30);
      this.bottomLabel = this.gps.f_speed_kmph;
    }
  }

  onReset(){
    this.needleValue = 0;
    this.bottomLabel = '0';
  }

}
