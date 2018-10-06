import { Component, OnInit, OnChanges, ViewChild, Input } from '@angular/core';
import { DataService }       from '../../../services/data.service';
import { Socket }            from 'ng-socket-io';

@Component({
  selector: 'app-accelerometer',
  templateUrl: './accelerometer.component.html',
})
export class AccelerometerComponent implements OnInit, OnChanges {

  constructor(
    private dataService:DataService,
    private socket: Socket,

  ) { }

  @Input() accelerometer:any;

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

  ngOnInit() {

  }

  ngOnChanges(){
    this.onRun(this.accelerometer);
  }

  onRun(accelerometer){
    console.log("onRun", this.cont)

    if(accelerometer){

      this.dataX.labels.push(this.cont)
      this.dataY.labels.push(this.cont)
      this.dataZ.labels.push(this.cont)
      this.dataX.datasets[0].data.push(accelerometer.x)
      this.dataY.datasets[0].data.push(accelerometer.y)
      this.dataZ.datasets[0].data.push(accelerometer.z)
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
