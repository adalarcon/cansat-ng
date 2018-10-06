import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Socket }            from 'ng-socket-io';


@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
})
export class GpsComponent implements OnInit, OnChanges {

  //{"type": "gps", "data": { "latitude":28.7030790,"longitude":-106.1407600,  "f_altitude":1564.50,"f_course": 71.00, "f_speed_kmph": 0.89, "satellites": 4          }}

  //f_speed_kmph line
  @Input() gps:any;

  constructor() { }

  latitude: number = 0;
  longitude: number = 0;
  satellites: number = 0;
  speed: number = 0;

  zoom: number = 15;

  ngOnInit() {

  }

  ngOnChanges(){
    if(this.gps){
      this.latitude= this.gps.latitude;
      this.longitude = this.gps.longitude;
      this.satellites = this.gps.satellites;
      this.speed = this.gps.speed;
    }
  }

}
