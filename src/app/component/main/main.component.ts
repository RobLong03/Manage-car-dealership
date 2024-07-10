import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MaterialModule } from '../../../_module/Material.Module';
import { MenuheaderComponent } from '../menuheader/menuheader.component';
import {MatGridListModule} from '@angular/material/grid-list';
@Component({
  selector: 'app-main',
  standalone: true,
  imports: [MaterialModule,RouterLink,
    RouterLinkActive,MenuheaderComponent,MatDialogModule,MatGridListModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
// https://s3-us-west-2.amazonaws.com/s.cdpn.io/3/car.svg
  tiles = [
    {text: 'Cars', cols: 1, rows: 1, color: 'trasparent',image:"https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",id:"cars",content:"ok"},
    {text: 'Customers', cols: 1, rows: 1, color: '#00000',image:""},
    {text: 'Tile 3', cols: 1, rows: 1, color: '#9C27B0',image:""},
    {text: 'Tile 4', cols: 1, rows: 1, color: '#673AB7',image:""},
    {text: 'Tile 5', cols: 1, rows: 1, color: '#3F51B5',image:""},
    {text: 'Tile 6', cols: 1, rows: 1, color: '#2196F3',image:""},
  ];

}
