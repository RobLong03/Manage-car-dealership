import { Location } from '@angular/common';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';

@Component({
  selector: 'app-menuheader',
  templateUrl: './menuheader.component.html',
  styleUrls: ['./menuheader.component.css'],
  standalone: true,
  imports: [
    MaterialModule,
    MatSidenavModule
  ]
})
export class MenuheaderComponent {
  showFiller = false;
    constructor (location:Location){}
    logout(){
      localStorage.removeItem("auth");
      location.replace("");
    }
}
