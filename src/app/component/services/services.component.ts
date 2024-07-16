import { Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { MatFooterRow } from '@angular/material/table';
import { MaterialModule } from '../../../_module/Material.Module';
import { MenuheaderComponent } from '../menuheader/menuheader.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [MaterialModule,MenuheaderComponent,MatFooterRow,MatError],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent {

}
