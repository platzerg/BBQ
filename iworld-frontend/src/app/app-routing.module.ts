import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RublistComponent } from './rubs/rublist/rublist.component';
import { RubdetailComponent } from './rubs/rubdetail/rubdetail.component';
import { SpicelistComponent } from './spices/spicelist/spicelist.component';
import { SpicemixlistComponent } from './spicemix/spicemixlist/spicemixlist.component';
import { CoretemperaturelistComponent } from './coretemperature/coretemperaturelist/coretemperaturelist.component';
import {LoginComponent} from './login/login.component';
import {AuthGuard} from './auth.guard';
import {SpicemixdetailComponent} from "./spicemix/spicemixdetail/spicemixdetail.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'rubdetail/:id',
    component: RubdetailComponent
  },
  {
    path: 'rubdetail/:rubid/spicemixdetail/:spicemixid',
    component: SpicemixdetailComponent
  },
  {
    path: 'rubdetail',
    redirectTo: 'rublist',
    pathMatch: 'full'
  },
  {
    path: 'rublist',
    component: RublistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'spices',
    component: SpicelistComponent
  },
  {
    path: 'spicemixlist',
    component: SpicemixlistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'coretemperaturelist',
    component: CoretemperaturelistComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
