import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-presion',
  templateUrl: './presion.component.html',
})
export class PresionComponent implements OnInit {

  @Input() presion:any;

  public canvasWidth = 200
  public needleValue = this.presion;
  public centralLabel = ''
  public name = 'Presion (bar)'
  public bottomLabel = '65'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(179, 224, 174)'],
      rangeLabel: ['0', '1500'],
      needleStartValue: 0,
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.needleValue = (this.presion * 100 /1500);
    this.bottomLabel = this.presion;
  }

  onReset(){
    this.needleValue = 0;
    this.bottomLabel = '0';
  }

}
