import { Location } from '@angular/common';
import { Telephone } from './../../../_model/Telephone';
import { Component } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { MatFormField, MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ServiceService } from '../../services/_service/-service.service';
import { MenuheaderComponent } from '../menuheader/menuheader.component';

@Component({
  selector: 'app-addtelephone',
  standalone: true,
  imports: [MaterialModule, MatFormField, MatFormFieldModule, MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MenuheaderComponent
  ],
  templateUrl: './addtelephone.component.html',
  styleUrl: './addtelephone.component.css'
})
export class AddtelephoneComponent {

  constructor(private route: Router, private formbuild: FormBuilder, private apiservice: ServiceService, private location:Location) {
  }

  Telephonedata!: Telephone[] | never;
  tel: Telephone | undefined;
  myform: any;
  onform() {
    this.apiservice.getAllCostumer().subscribe(x => {
      this.Telephonedata = x;
    })

    this.myform = this.formbuild.group({
      name: this.formbuild.control('', Validators.required),
      color: this.formbuild.control('', Validators.required),
      capacity: this.formbuild.control('', Validators.required),
    })
    const lastElement = this.Telephonedata[this.Telephonedata.length - 1];
    if (lastElement !== undefined) {
      this.tel!.id = lastElement.id + 1;
    }
    else {
      this.tel!.id = 0;
    }
    if (this.myform.valid) {
      const obj: Telephone = {
        id:this.myform.value =this.tel!.id,
        name: this.myform.value as string,
        data: {
          color: this.myform.color as string,
          capacity: Number(this.myform.capacity)
        }
      }
      this.Telephonedata.push(obj);
    }



  }
  backinback(){
    this.location.back();
  }
}
