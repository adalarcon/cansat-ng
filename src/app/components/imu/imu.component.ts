import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService }       from '../../services/data.service';
import { Socket }            from 'ng-socket-io';

@Component({
  selector: 'app-imu',
  templateUrl: './imu.component.html',
})
export class IMUComponent implements OnInit {

  constructor(
    private dataService:DataService,
    private socket: Socket,

  ) { }

  data: any;

  ngOnInit() {

    this.socket.fromEvent("imu").subscribe( data => {
      this.data = data;
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
