import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-altitude',
  templateUrl: './altitude.component.html',
})
export class AltitudeComponent implements OnInit {

  // {"type": "b180", "data": {"altitude":40.42,"presion":849.39 }}

  //altitud 0 >> 200 metros  line

  //presion 0 >> 200 bar  gaus

  @ViewChild('chart') chart;
  @Input() altitude:any;

  cont = 0;

  data = {
      labels: [],
      datasets: [
          {
              label: 'Altitude',
              data: [],
              fill: false,
              borderColor: '#4bc0c0'
          },
      ]
  };

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(){
    this.onUpdateChart();
  }

  onUpdateChart(){
    this.cont++;
    this.data.labels.push(this.cont);
    this.data.datasets[0].data.push(this.altitude);
    this.chart.refresh();
  }

  onReset(){
    this.data.labels= [];
    this.data.datasets[0].data= [];
    this.chart.refresh();
  }


}
