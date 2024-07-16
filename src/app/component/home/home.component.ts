import { Component, OnInit, Sanitizer, SecurityContext, signal } from '@angular/core';
import { MaterialModule } from '../../../_module/Material.Module';
import { Location } from '@angular/common';
import {  FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserAdmin } from '../../../_model/UserAdmin';
import { ServiceService } from '../../services/_service/-service.service';
import { Router } from '@angular/router';
import { MenuheaderComponent } from '../menuheader/menuheader.component';
import { MatFooterRow } from '@angular/material/table';
import { MatError, MatHint } from '@angular/material/form-field';
import { ToastService } from '../../services/toastservice/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule,MenuheaderComponent,MatFooterRow,MatError],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  myform!: FormGroup;
  isVisibile: boolean = false
  defaultValue: any;
  // protected readonly value = signal('');


  constructor(
    private location: Location,
    private service: ServiceService,
    private formbuild: FormBuilder,
    private router: Router,
    private toastService: ToastService,
    private sanit:DomSanitizer

  ) {
    this.myform = new FormGroup({
    nameuser: new FormControl('',[Validators.minLength(5),Validators.required]),
    password: new FormControl('',[Validators.minLength(8),Validators.required]),
    authorization: new FormControl('',[Validators.minLength(4),Validators.required]),
  });
}
  ngOnInit(): void {
    this.service.logout();
  }
  // protected onInput(event: Event) {
  //   this.value.set((event.target as HTMLInputElement).value);
  // }
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
  onform() {

    if (this.myform.valid) {
      const obj: UserAdmin = {
        nameuser: this.sanit.sanitize(SecurityContext.NONE, this.myform.get('nameuser')?.value) || '',
        password: this.sanit.sanitize(SecurityContext.NONE, this.myform.get('password')?.value) || '',
        authorization: this.sanit.sanitize(SecurityContext.NONE, this.myform.get('authorization')?.value) || '',
      };

      this.service.authenticate(obj.nameuser, obj.password, obj.authorization).subscribe((data: any) => {
        if (data && this.service.isAuthenticatedUser()) {
          this.toastService.show("Log-in")
          setTimeout(() => {
            this.router.navigate(['/Main']);
          }, 2000)
        }
        else{
          this.myform.controls['nameuser'].setErrors({ 'custom': true });
          this.myform.controls['password'].setErrors({ 'custom': true });
          this.myform.controls['authorization'].setErrors({ 'custom': true });
          if (this.myform.invalid) {
            this.toastService.showerrors("Problems!")
          }
        }
      }
    );

    } else {
      this.toastService.showerrors("Problems!")
    }


  }
}
