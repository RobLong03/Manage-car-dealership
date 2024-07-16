import { Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { MatFooterRow } from '@angular/material/table';
import { MaterialModule } from '../../../_module/Material.Module';
import { MenuheaderComponent } from '../menuheader/menuheader.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [MaterialModule,MenuheaderComponent,MatFooterRow,MatError],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent {
  constructor(){
    
  }
}
