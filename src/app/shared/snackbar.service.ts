import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  config: MatSnackBarConfig = {
    duration: 3000,
    horizontalPosition: 'center',
    verticalPosition: 'top'
  }

  constructor(private snackBar: MatSnackBar) { }

  success(message: string) {
    this.config.panelClass = 'alert-success'

    this.snackBar.open(message, '✔️', this.config)
  }

  error(message: string) {
    this.config.panelClass = 'alert-danger'

    this.snackBar.open(message, '⛔', this.config)
  }
}
