import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ClienteService } from './../../../services/cliente.service';
import { SnackbarService } from './../../../shared/snackbar.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {

  public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  constructor(public dialogRef: MatDialogRef<ClienteFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private clienteService: ClienteService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let titleSuccess: string;
    let titleError: string;

    if (form.value.id) {
      titleSuccess = 'Cliente editado com sucesso.';
      titleError = 'Erro ao editar cliente.';
      form.value.dono = this.data.dono;
    } else {
      titleSuccess = 'Cliente cadastrado com sucesso.';
      titleError = 'Erro ao cadastrar cliente.';
    }

    this.clienteService.save(form.value).subscribe(
      success => {
        this.snackbarService.success(titleSuccess);
        this.dialogRef.close(form.value);
      }, error => {
        this.snackbarService.error(titleError);
        this.dialogRef.close();
      }
    )
  }

}
