import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './components/layout/main/main-layout.component';
import { CleanLayoutComponent } from './components/layout/clean/clean-layout.component';
import { HomeComponent } from './components/home/home.component';
import { HistoryComponent } from './components/history/history.component';
import { DisplayComponent } from './components/display/display.component';


export const ROUTES: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: CleanLayoutComponent, children:[
  ]},
  { path: '', component: MainLayoutComponent, children:[
    { path: 'home', component: HomeComponent },
    { path: 'history', component: HistoryComponent },
    { path: 'display', component: DisplayComponent }
  ]},

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);
