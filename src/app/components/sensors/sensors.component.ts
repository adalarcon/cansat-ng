import { Component, OnInit, ViewChild } from '@angular/core';
import { DataService }       from '../../services/data.service';
import { Socket }            from 'ng-socket-io';

@Component({
  selector: 'app-sensors',
  templateUrl: './sensors.component.html',
})
export class SensorsComponent implements OnInit {

  constructor(
    private dataService:DataService,
    private socket: Socket,
  ) { }

  altitude: any = 22;
  presion: any = 1000;
  humidity:any = 44;
  temperatureOut: any=55;
  temperatureIn: any=66;
  vibration: any = 77;
  voltage: any = 7;
  gps: any;
  accelerometer: any;
  gyroscope: any;

  ngOnInit() {

    this.socket.on("imu", res => {
      this.accelerometer = res.data.accelerometer;
      this.gyroscope = res.data.gyroscope;
    });

    this.socket.on("b180", res => {
      this.altitude = res.data.altitude;
      this.presion = res.data.presion;
    });

    this.socket.on("dth", res => {
      this.humidity = res.data.humidity;
      this.temperatureIn = res.data.temperature;
    });

    this.socket.on("lm35", res => {
      this.temperatureOut = res.data.temperature;
    });

    this.socket.on("sw", res => {
      this.vibration = res.data.vibration;
    });

    this.socket.on("volt", res => {
      this.voltage = res.data.volt;
    });

    this.socket.on("gps", res => {
      this.gps = res['data'];
    });

    this.socket.on("message", data => {
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
