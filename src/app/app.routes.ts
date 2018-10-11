import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './components/layout/main/main-layout.component';
import { CleanLayoutComponent } from './components/layout/clean/clean-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';

import { AccelerometerHistoryComponent } from './components/history/accelerometer-history/accelerometer-history.component';
import { AltitudeHistoryComponent } from './components/history/altitude-history/altitude-history.component';
import { GPSHistoryComponent } from './components/history/gps-history/gps-history.component';
import { GyroscopeHistoryComponent } from './components/history/gyroscope-history/gyroscope-history.component';
import { HumidityHistoryComponent } from './components/history/humidity-history/humidity-history.component';
import { PresionHistoryComponent } from './components/history/presion-history/presion-history.component';
import { SpeedHistoryComponent } from './components/history/speed-history/speed-history.component';
import { TemperatureHistoryComponent } from './components/history/temperature-history/temperature-history.component';
import { VibrationHistoryComponent } from './components/history/vibration-history/vibration-history.component';
import { VoltageHistoryComponent } from './components/history/voltage-history/voltage-history.component';

export const ROUTES: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: CleanLayoutComponent, children:[
  ]},
  { path: '', component: MainLayoutComponent, children:[
    { path: 'home', component: HomeComponent },
    { path: 'history', component: HistoryComponent , children:[
      { path: 'accelerometer', component: AccelerometerHistoryComponent },
      { path: 'altitude', component: AltitudeHistoryComponent },
      { path: 'gps', component: GPSHistoryComponent },
      { path: 'gyroscope', component: GyroscopeHistoryComponent },
      { path: 'humidity', component: HumidityHistoryComponent },
      { path: 'presion', component: PresionHistoryComponent },
      { path: 'speed', component: SpeedHistoryComponent },
      { path: 'temperature', component: TemperatureHistoryComponent },
      { path: 'vibration', component: VibrationHistoryComponent },
      { path: 'voltage', component: VoltageHistoryComponent },
    ]},
  ]},

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
