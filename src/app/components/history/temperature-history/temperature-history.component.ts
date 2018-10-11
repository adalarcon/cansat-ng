import { Component, OnInit } from '@angular/core';
import { DataService }       from '../../../services/data.service';

@Component({
  selector: 'app-temperature-history',
  templateUrl: './temperature-history.component.html',
})
export class TemperatureHistoryComponent implements OnInit {

  list: Array<any>;
  size: number = 10;
  index: number = 0;
  isLoading= false;


  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.onFind();
  }

  onFind(){
    this.isLoading = true;
    let params = new URLSearchParams();
    params.set("filter[type]", 'lm35');
    params.set("pager[size]", String(this.size));
    params.set("pager[index]", String(this.index));
    this.dataService.findByParams("logs", params.toString()).subscribe(res =>{
      this.list = res;
      this.isLoading = false;
    });
  }


  onRefresh(){
    this.onFind();
  }

  onNext(){
    console.log("next")
    this.index = this.index + 1;
    this.onFind();
  }

  onBack(){
    if(this.index > 0){
      this.index = this.index - 1;
      this.onFind();
    }
  }

}
