import { Component, OnInit, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-vibration',
  templateUrl: './vibration.component.html',
})
export class VibrationComponent implements OnInit {

  //{"type": "sw", "data": {"vibration": 0}}
  // vibration HZ LINE 0 >> 2500

  @ViewChild('chart') chart;
  @Input() vibration:any;

  cont = 0;

  data = {
      labels: [],
      datasets: [
          {
              label: 'Vibration',
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
    this.data.datasets[0].data.push(this.vibration);
    this.chart.refresh();
  }

}
