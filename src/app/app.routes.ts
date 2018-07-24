import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { Routes, RouterModule } from '@angular/router';

import { MainLayoutComponent } from './components/layout/main/main-layout.component';
import { CleanLayoutComponent } from './components/layout/clean/clean-layout.component';
import { HomeComponent } from './components/home/home.component';

export const ROUTES: Routes = [
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '', component: CleanLayoutComponent, children:[
  ]},
  { path: '', component: MainLayoutComponent, children:[
    { path: 'home', component: HomeComponent }
  ]},

];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(ROUTES);