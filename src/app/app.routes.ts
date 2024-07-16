import { Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { authGuardGuard } from './services/_service/auth.guard.guard';
import { CustomerComponent } from './component/customer/customer.component';
// import { AddtelephoneComponent } from './component/addtelephone/addtelephone.component';
import { AddcustomerComponent } from './component/addcustomer/addcustomer.component';
import { MainComponent } from './component/main/main.component';
import { CarsComponent } from './component/cars/cars.component';
import { SalesComponent } from './component/sales/sales.component';
import { BalanceComponent } from './component/balance/balance.component';
import { ServicesComponent } from './component/services/services.component';
import { InfosComponent } from './component/infos/infos.component';

export const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'Customer', component: CustomerComponent, canActivate: [authGuardGuard] },
  // { path: 'add', component: AddtelephoneComponent, canActivate: [authGuardGuard] },
  { path: 'addcustomer', component: AddcustomerComponent, canActivate: [authGuardGuard] },
  {path:'Sales',component: SalesComponent, canActivate: [authGuardGuard]},
  {path:'Cars',component: CarsComponent, canActivate: [authGuardGuard]},
  {path:'Balance',component: BalanceComponent, canActivate: [authGuardGuard]},
  {path:'Services',component: ServicesComponent, canActivate: [authGuardGuard]},
  {path:'Infos',component: InfosComponent, canActivate: [authGuardGuard]},
  {path:'Main',component:MainComponent,canActivate:[authGuardGuard]},
  { path: '**', redirectTo: '' },

];
