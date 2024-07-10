import { ServiceService } from './../../app/services/_service/-service.service';
import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MaterialModule } from '../../_module/Material.Module';
import { Costumer } from '../../_model/Costumer';

@Component({
  selector: 'app-mat-input-prompt',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './mat-input-prompt.component.html',
  styleUrls: ['./mat-input-prompt.component.css']
})
export class MatInputPromptComponent implements OnInit {
    editdata:any;
    myform!:FormGroup;
    isVisibile: boolean = false;
    constructor(
      private dialogRef: MatDialogRef<MatInputPromptComponent>,
      @Inject(MAT_DIALOG_DATA) public  data: { id: number } ,
      private fb: FormBuilder,
      private service:ServiceService,
      private cdr: ChangeDetectorRef
    ) {}
    ngOnInit(): void {
      this.myform = this.fb.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        vat: [''],
        città: ['']
      });

      if (this.data && this.data.id) {
        this.service.getCostumerbyid(this.data.id).subscribe(
          (item) => {
            this.editdata = item;
            this.patchFormValues();
          },
          (error) => {
            console.error('Failed to fetch customer data:', error);
          }
        );
      } else {
        console.error('No valid ID provided in dialog data.');
      }
    }

    patchFormValues() {
      // console.log('Patching form values:', this.editdata[0]);
      if (this.editdata) {
        this.myform.patchValue({
          name: this.editdata[0].nome,
          surname: this.editdata[0].cognome,
          email: this.editdata[0].email,
          password: this.editdata[0].password,
          vat: this.editdata[0].partitaiva,
          città: this.editdata[0].citta
        });
      }
      this.cdr.detectChanges();
    }

  visibile() {
    const input = document.getElementById('pass') as HTMLInputElement;
    if (input) {
      if (input.type === 'password') {
        input.type = 'text';
        this.isVisibile = !this.isVisibile;
      } else {
        this.isVisibile = !this.isVisibile;
        input.type = 'password';
      }
    }
  }

  form() {

    if (this.myform.valid) {
      const obj: Costumer = {
        name: this.myform.get('name')?.value,
        password: this.myform.get('password')?.value,
        email: this.myform.get('email')?.value,
        surname: this.myform.get('surname')?.value,
        city: this.myform.get('città')?.value,
        vat: this.myform.get("vat")?.value,
        id: this.data.id
      };
      this.service.editcostumer(obj).subscribe((x) => {
        location.reload();
        this.dialogRef.close()

      })
    }


  }

close(){
  this.dialogRef.close()
}

  /*if (this.myform.valid) {
      const obj: Costumer = {
        name: this.myform.get('name')?.value,
        password: this.myform.get('password')?.value,
        email: this.myform.get('email')?.value,
        surname: this.myform.get('surname')?.value,
        city: this.myform.get('città')?.value,
        vat: this.myform.get("vat")?.value,
        id: null
      };
      this.service.editcostumer(obj).subscribe((x)=>{
        console.log(x);
      })
    } */
}
