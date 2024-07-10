import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuheaderComponent } from "./component/menuheader/menuheader.component";
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../_module/Material.Module';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, MenuheaderComponent,CommonModule,MaterialModule]
})
export class AppComponent {
  title = 'app';

}
