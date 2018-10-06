import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-voltage',
  templateUrl: './voltage.component.html',
})
export class VoltageComponent implements OnInit {

  // {"type": "Voltimetro", "data": {"volt": 2.56}}
  // tacometro  seran volts y sera de 7v a 8.4v

  @Input() voltage:any;

  public canvasWidth = 200
  public needleValue = 0;
  public centralLabel = ''
  public name = 'Voltage (V)'
  public bottomLabel = '65'
  public options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ["rgb(255,84,84)"],
      rangeLabel: ['0', '8'],
      needleStartValue: 0,
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.needleValue = (this.voltage * 100 /8);
    this.bottomLabel = this.voltage;
  }

  onReset(){
    this.needleValue = 0;
    this.bottomLabel = '0';
  }

}
