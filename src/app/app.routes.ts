import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { authGuardGuard } from './services/_service/auth.guard.guard';
import { CustomerComponent } from './component/customer/customer.component';
// import { AddtelephoneComponent } from './component/addtelephone/addtelephone.component';
import { AddcustomerComponent } from './component/addcustomer/addcustomer.component';
import { MainComponent } from './component/main/main.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Customer', component: CustomerComponent, canActivate: [authGuardGuard] },
  // { path: 'add', component: AddtelephoneComponent, canActivate: [authGuardGuard] },
  { path: 'addcustomer', component: AddcustomerComponent, canActivate: [authGuardGuard] },
  {path:'Main',component:MainComponent,canActivate:[authGuardGuard]},
  { path: '**', redirectTo: '' }
];
