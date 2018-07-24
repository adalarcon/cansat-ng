import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTING } from "./app.routes";
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { ChartModule } from 'primeng/chart';
import { GMapModule } from 'primeng/gmap';

import { AgmCoreModule } from '@agm/core';

import { MainLayoutComponent } from './components/layout/main/main-layout.component';
import { MenuComponent } from './components/layout/main/menu/menu.component';
import { HeaderComponent } from './components/layout/main/header/header.component';
import { FooterComponent } from './components/layout/main/footer/footer.component';
import { ContentComponent } from './components/layout/main/content/content.component';
import { CleanLayoutComponent } from './components/layout/clean/clean-layout.component';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    CleanLayoutComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    ContentComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    ChartModule,
    HttpClientModule,
    GMapModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCDg3Orzu4YR0zDyeHxtvk5Yic8IvnIbKE'
    }),
    ROUTING
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
