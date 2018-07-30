import { Component, OnInit } from '@angular/core';
import { DataService }       from '../../../services/data.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
})
export class HistoryComponent implements OnInit {

  imu: Array<any>;
  gps: Array<any>;
  size: number = 10;
  index: number = 0;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.onFindIMU();
  }

  onFindIMU(){
    let params = new URLSearchParams();
    params.set("filter[type]", 'imu');
    params.set("pager[size]", String(this.size));
    params.set("pager[index]", String(this.index));
    this.dataService.findByParams("logs", params.toString()).subscribe(data =>{
      this.imu = data;
    });
  }

  onFindGPS(){
    let params = new URLSearchParams();
    params.set("filter[type]", 'gps');
    params.set("pager[size]", String(this.size));
    params.set("pager[index]", String(this.index));
    this.dataService.findByParams("logs", params.toString()).subscribe(data =>{
      this.gps = data;
    });
  }

  onRefresh(){
    this.onFindIMU();
  }

  onNext(){
    console.log("next")
    this.index = this.index + 1;
    this.onFindIMU();
  }

  onBack(){
    if(this.index > 0){
      this.index = this.index - 1;
      this.onFindIMU();
    }
  }

}
