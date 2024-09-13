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
    {text: 'Cars', cols: 1, rows: 1, color: 'trasparent',image:"https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",router:"/Cars"},
    {text: 'Customers', cols: 1, rows: 1, color: 'trasparent',image:"https://media.licdn.com/dms/image/v2/C5612AQFpNUcwmy8DUg/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1520077092556?e=1731542400&v=beta&t=pV0NbKBM9HcEI7DzZ4S15BusFqCf33ffwUYbCDmeG-o", router:"/Customer"},
    {text: 'Sales and Retails', cols: 1, rows: 1, color: 'trasparent',image:"https://www.venditoreprofessionista.it/wp-content/uploads/2017/12/arrows-2899885_1920.jpg" ,router:"/Sales"},
    {text: 'Balance', cols: 1, rows: 1, color: 'trasparent',image:"https://blog.crescitalia.com/hubfs/equilibrio%20economico%20finanziario%20pmi.jpg", router:"/Balance"},
    {text: 'Services', cols: 1, rows: 1, color: 'trasparent',image:"https://stl.tech/wp-content/uploads/2023/02/Network-services-scaled.webp",router:"/Services"},
    {text: 'Infos', cols: 1, rows: 1, color: 'trasparent',image:"https://leclaireur.fnac.com/wp-content/uploads/2022/03/shutterstock-2087797885-e1647955096585-1256x826.jpg",router:"/Infos"},
  ];

}
