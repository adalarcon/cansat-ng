import { Component, OnInit } from '@angular/core';
import { Socket }            from 'ng-socket-io';


@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
})
export class GpsComponent implements OnInit {

  //{"type": "gps", "data": { "latitude":28.7030790,"longitude":-106.1407600,  "f_altitude":1564.50,"f_course": 71.00, "f_speed_kmph": 0.89, "satellites": 4          }}

  //f_speed_kmph line


  constructor(
    private socket: Socket,
  ) { }

  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 15;

  ngOnInit() {

    this.socket.on("gps", (data) => {
      console.log(data)
      this.latitude = data['data'].latitude;
      this.longitude = data['data'].longitude;
    });


    this.socket.on("message", (data) => {
      console.log("[on][message] incoming message ", data);
    });

    this.socket.on("connect", ()=> {
      console.log("[on][connect] Conected to socket");
    });

    this.socket.on('error', error => {
      console.log("[on][error]", error);
    });
  }

}
