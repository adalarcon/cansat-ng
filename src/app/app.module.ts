import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ROUTING } from "./app.routes";
import { HttpClientModule } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { WebcamModule } from 'ngx-webcam';

import { environment } from '../environments/environment';

import { SocketIoModule, SocketIoConfig } from 'ng-socket-io';
import { ChartModule } from 'primeng/chart';
import { GMapModule } from 'primeng/gmap';
import { GaugeChartModule } from 'angular-gauge-chart'
import { AgmCoreModule } from '@agm/core';

import { AppComponent } from './app.component';

import { MainLayoutComponent } from './components/layout/main/main-layout.component';
import { MenuComponent } from './components/layout/main/menu/menu.component';
import { HeaderComponent } from './components/layout/main/header/header.component';
import { AvatarComponent } from './components/layout/main/avatar/avatar.component';
import { FooterComponent } from './components/layout/main/footer/footer.component';
import { ContentComponent } from './components/layout/main/content/content.component';
import { CleanLayoutComponent } from './components/layout/clean/clean-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { AccelerometerComponent } from './components/sensors/accelerometer/accelerometer.component';
import { GpsComponent } from './components/sensors/gps/gps.component';
import { GyroscopeComponent } from './components/sensors/gyroscope/gyroscope.component';
import { MagnetometerComponent } from './components/sensors/magnetometer/magnetometer.component';
import { SensorsComponent } from './components/sensors/sensors.component';
import { AltitudeComponent } from './components/sensors/altitude/altitude.component';
import { PresionComponent } from './components/sensors/presion/presion.component';
import { HumidityComponent } from './components/sensors/humidity/humidity.component';
import { TemperatureOutComponent } from './components/sensors/temperature-out/temperature-out.component';
import { TemperatureInComponent } from './components/sensors/temperature-in/temperature-in.component';
import { VibrationComponent } from './components/sensors/vibration/vibration.component';
import { VoltageComponent } from './components/sensors/voltage/voltage.component';
import { WebcamComponent } from './components/sensors/webcam/webcam.component';
import { Gyroscope3DComponent } from './components/sensors/gyroscope-3d/gyroscope-3d.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CleanLayoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    AvatarComponent,
    ContentComponent,
    HomeComponent,
    AccelerometerComponent,
    GpsComponent,
    GyroscopeComponent,
    MagnetometerComponent,
    SensorsComponent,
    HistoryComponent,
    AltitudeComponent,
    PresionComponent,
    HumidityComponent,
    TemperatureOutComponent,
    TemperatureInComponent,
    VibrationComponent,
    VoltageComponent,
    WebcamComponent,
    Gyroscope3DComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    GMapModule,
    FormsModule,
    WebcamModule,
    GaugeChartModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDg3Orzu4YR0zDyeHxtvk5Yic8IvnIbKE'
    }),
    SocketIoModule.forRoot(
      { url: environment.serverBaseURL + environment.api + 'io/logs?s=ui', options: {} }
    ),
    ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
