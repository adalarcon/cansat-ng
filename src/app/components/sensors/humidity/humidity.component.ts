import { Component, OnInit, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-humidity',
  templateUrl: './humidity.component.html',
})
export class HumidityComponent implements OnInit {

  //{"type": "dth", "data": {"humidity":73.00,"temperature":24.00}}

  // humidity 0 >> 100 % gause azul

  @Input() humidity:any;

  public canvasWidth = 200
  public needleValue = 0
  public centralLabel = ''
  public name = 'Humidity (%)'
  public bottomLabel = '65'
  rangeMin = '0';
  rangeMax = '100';
  options = {
      hasNeedle: true,
      needleColor: 'gray',
      needleUpdateSpeed: 1000,
      arcColors: ['rgb(166, 206, 227)'],
      rangeLabel: [this.rangeMin, this.rangeMax],
      needleStartValue: 0,
  };

  range=[];
  modal: any;

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.needleValue = this.humidity;
    this.bottomLabel = this.humidity;
  }

  onReset(){
    this.needleValue = 0;
    this.bottomLabel = '0';
  }

}
