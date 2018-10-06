import { AfterViewInit,OnInit, OnChanges, Component, ElementRef, Input, ViewChild, HostListener } from '@angular/core';

@Component({
  selector: 'app-gyroscope',
  templateUrl: './gyroscope.component.html',
})
export class GyroscopeComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() gyroscope:any;
  @ViewChild('canvas') private canvasRef: ElementRef;
  @ViewChild('chart1') chart1;
  @ViewChild('chart2') chart2;
  @ViewChild('chart3') chart3;

  cont: number = 0;
  dataX: any = {
      labels: [],
      datasets: [
          {
              label: 'X',
              data: [],
              fill: false,
              borderColor: '#4bc0c0'
          },
      ]
  };

  dataY: any = {
      labels: [],
      datasets: [
          {
              label: 'Y',
              data: [],
              fill: false,
              borderColor: '#565656'
          }
      ]
  };
  dataZ: any = {
      labels: [],
      datasets: [
          {
              label: 'Z',
              data: [],
              fill: false,
              borderColor: '#f00'
          }
      ]
  };

  constructor( ) {
  }

  ngAfterViewInit() {
  }

  ngOnInit() {

  }

  ngOnChanges(){
    this.onRun(this.gyroscope);
  }


  onRun(gyroscope){
    console.log("onRun", this.cont)
    if(gyroscope){
      this.dataX.labels.push(this.cont)
      this.dataY.labels.push(this.cont)
      this.dataZ.labels.push(this.cont)
      this.dataX.datasets[0].data.push(gyroscope.x)
      this.dataY.datasets[0].data.push(gyroscope.y)
      this.dataZ.datasets[0].data.push(gyroscope.z)
      this.cont++

      this.chart1.refresh();
      this.chart2.refresh();
      this.chart3.refresh();
    }

  }

  onReset(){
    this.dataX.labels= [];
    this.dataY.labels= [];
    this.dataZ.labels= [];
    this.dataX.datasets[0].data= [];
    this.dataY.datasets[0].data= [];
    this.dataZ.datasets[0].data= [];
    this.chart1.refresh();
    this.chart2.refresh();
    this.chart3.refresh();
  }

}
