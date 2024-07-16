import { Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { MatFooterRow } from '@angular/material/table';
import { MaterialModule } from '../../../_module/Material.Module';
import { ToastService } from '../../services/toastservice/toast.service';
import { MenuheaderComponent } from '../menuheader/menuheader.component';

@Component({
  selector: 'app-infos',
  standalone: true,
  imports: [MaterialModule,MenuheaderComponent,MatFooterRow,MatError],
  templateUrl: './infos.component.html',
  styleUrl: './infos.component.css'
})
export class InfosComponent {

}
