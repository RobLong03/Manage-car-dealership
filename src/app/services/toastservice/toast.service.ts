import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private snackBar: MatSnackBar) {}

  showerrors(message: string, action: string = 'Close', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration: duration,
      verticalPosition: 'bottom',
      horizontalPosition: 'right',
      panelClass:['errors-snackbar']

    });

  }
  show(message: string, action: string = 'Close', duration: number = 3000):void{
    this.snackBar.open(message,action,{
      duration:duration,
      verticalPosition:'bottom',
      horizontalPosition:'right',
      panelClass:['sux-snackbar']
    })
  }
}
