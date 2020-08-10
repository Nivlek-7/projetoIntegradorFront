import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { EstacionamentoService } from './../../../services/estacionamento.service';
import { SnackbarService } from './../../../shared/snackbar.service';

@Component({
  selector: 'app-estac-form',
  templateUrl: './estac-form.component.html',
  styleUrls: ['./estac-form.component.css']
})
export class EstacFormComponent implements OnInit {

  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  constructor(public dialogRef: MatDialogRef<EstacFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private estService: EstacionamentoService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.value.id) {
      form.value.vagasDisponiveis = form.value.vagasDisponiveis + form.value.vagas - this.data.vagasDisponiveis;

      this.estService.save(form.value).subscribe(
        success => {
          this.snackbarService.success('Estacionamento editado com sucesso.');
          this.dialogRef.close(form.value);
        }, error => {
          this.snackbarService.error('Erro ao editar estacionamento.');
          this.dialogRef.close();
        }
      )
    } else {
      form.value.vagasDisponiveis = form.value.vagas;

      this.estService.save(form.value).subscribe(
        success => {
          this.snackbarService.success('Estacionamento cadastrado com sucesso.');
          this.dialogRef.close(form.value);
        }, error => {
          this.snackbarService.error('Erro ao cadastrar estacionamento.');
          this.dialogRef.close();
        }
      )
    }
  }

}
