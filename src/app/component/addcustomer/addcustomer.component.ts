import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { MenuheaderComponent } from '../menuheader/menuheader.component';
import { MatError } from '@angular/material/form-field';
import { MatFooterRow } from '@angular/material/table';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../../services/_service/-service.service';
import { ToastService } from '../../services/toastservice/toast.service';
import { Costumer } from '../../../_model/Costumer';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-addcustomer',
  standalone: true,
  imports: [MaterialModule,MenuheaderComponent,MatFooterRow,MatError],
  templateUrl: './addcustomer.component.html',
  styleUrl: './addcustomer.component.css'
})
export class AddcustomerComponent {
  myform!: FormGroup;
  isVisibile: boolean = false
  defaultValue: any;
  dataFromDialog: any;
  constructor(
    private location: Location,
    private service: ServiceService,
    private formbuild: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private dialog: MatDialog
  ) { }
  ngOnInit() {
    this.myform = new FormGroup({
      name: new FormControl('',[Validators.required]),
      surname: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required,Validators.email]),
      password:new FormControl('',[Validators.required]),
      vat:new FormControl(''),
      città:new FormControl(''),
    });
  }

  visibile() {
    var input = document.getElementById('pass') as HTMLInputElement;
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        this.isVisibile = !this.isVisibile;
      } else {
        this.isVisibile = !this.isVisibile;
        input.type = 'password'
      }
    }
  }
  backinback(){
    this.location.back();
  }
  onform() {
    this.service.getnumbersid().subscribe(x => {
      if (this.myform.valid) {

        const obj: Costumer = {
          name: this.myform.get('name')?.value,
          password: this.myform.get('password')?.value,
          email: this.myform.get('email')?.value,
          surname: this.myform.get('surname')?.value,
          city: this.myform.get('città')?.value,
          vat: this.myform.get("vat")?.value,
          id: x+1,
        };



        this.service.postcostumer(obj).subscribe(x => {
          if (x) {
            this.toastService.show("Customer added succesfully")

            setTimeout(() => {
              this.router.navigate(['/Customer']);
            }, 2000);

          } else {
            this.toastService.showerrors("Problems!")
          }
        })
      }
    })

  }

}
