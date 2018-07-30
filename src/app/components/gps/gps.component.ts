import { Component, OnInit } from '@angular/core';
import { Socket }            from 'ng-socket-io';


@Component({
  selector: 'app-gps',
  templateUrl: './gps.component.html',
})
export class GpsComponent implements OnInit {

  constructor(
    private socket: Socket,
  ) { }

  latitude: number = 0;
  longitude: number = 0;
  zoom: number = 15;

  ngOnInit() {

    this.socket.fromEvent("gps").subscribe( data => {
      console.log(data)
      this.latitude = data['data'].latitude;
      this.longitude = data['data'].longitude;
    });

    this.socket.fromEvent("message").subscribe( data => {
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
