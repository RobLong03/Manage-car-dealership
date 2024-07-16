import { Component } from '@angular/core';
import { MatError } from '@angular/material/form-field';
import { MatFooterRow } from '@angular/material/table';
import { MaterialModule } from '../../../_module/Material.Module';
import { ToastService } from '../../services/toastservice/toast.service';
import { MenuheaderComponent } from '../menuheader/menuheader.component';


@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [MaterialModule,MenuheaderComponent,MatFooterRow,MatError],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  constructor (){

  }
}
