import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService }       from '../../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  constructor(
    private dataService:DataService
  ) { }

  @ViewChild('chart1') chart1;
  @ViewChild('chart2') chart2;
  @ViewChild('chart3') chart3;

  cont: number = 0;
  pageSize: number = 1;
  pageIndex: number = 1;
  interval: number = 1000;
  zoom: number = 8;
  lat: number = 51.673858;
  lng: number = 7.815982;

  options: any = {
      center: {lat: this.lat, lng: this.lng},
      zoom: 12
  };
  overlays: any[];

  dataX: any = {
      labels: [],
      datasets: [
          {
              label: 'Accelerometer X',
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
              label: 'Accelerometer Y',
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
              label: 'Accelerometer Z',
              data: [],
              fill: false,
              borderColor: '#f00'
          }
      ]
  };

  ngOnInit() {

    this.onFind();

    var interval = setInterval(()=> {
      this.onFind();
      this.pageIndex++;
    }, this.interval);

  }

  onFind(){
    let params = new URLSearchParams();
    params.set("filter[type]", 'metrics');
    params.set("pager[pageSize]", String(this.pageSize));
    params.set("pager[pageIndex]", String(this.pageIndex));

    this.dataService.findByParams("logs", params.toString()).subscribe((data)=>{
      for (let i = 0; i < data.length; i++) {
        this.dataX.labels.push(this.cont)
        this.dataY.labels.push(this.cont)
        this.dataZ.labels.push(this.cont)
        this.dataX.datasets[0].data.push(data[i].data.accelerometer.x)
        this.dataY.datasets[0].data.push(data[i].data.accelerometer.y)
        this.dataZ.datasets[0].data.push(data[i].data.accelerometer.z)
        this.cont++
      }

      // if(this.cont >= 10){
      //   this.dataX.datasets[0].data.splice(0,1);
      //   this.dataY.datasets[0].data.splice(0,1);
      //   this.dataZ.datasets[0].data.splice(0,1);
      //   this.dataX.labels.splice(0,1)
      //   this.dataY.labels.splice(0,1)
      //   this.dataZ.labels.splice(0,1)
      // }

      this.chart1.refresh();
      this.chart2.refresh();
      this.chart3.refresh();
    });

  }


}
