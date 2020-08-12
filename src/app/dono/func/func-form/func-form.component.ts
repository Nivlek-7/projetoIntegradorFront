import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Estacionamento } from './../../../models/estacionamento.model';
import { EstacionamentoService } from './../../../services/estacionamento.service';
import { FuncionarioService } from './../../../services/funcionario.service';
import { SnackbarService } from './../../../shared/snackbar.service';


@Component({
  selector: 'app-func-form',
  templateUrl: './func-form.component.html',
  styleUrls: ['./func-form.component.css']
})
export class FuncFormComponent implements OnInit {

  estacionamentos: Estacionamento[] = [];
  estacionamento: Estacionamento;

  public maskTelefone = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  public maskCpf = [/\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '.', /\d/, /\d/, /\d/, '-', /\d/, /\d/];


  constructor(public dialogRef: MatDialogRef<FuncFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private estService: EstacionamentoService,
    private funcService: FuncionarioService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (!this.data.estacionamento) {
      this.estService.list().subscribe(data => this.estacionamentos = data);
    }
  }

  onSubmit(form: NgForm) {
    let titleSuccess: string;
    let titleError: string;

    if (form.value.id) {
      titleSuccess = 'Funcionário editado com sucesso.';
      titleError = 'Erro ao editar funcionário.';
    } else {
      titleSuccess = 'Funcionário cadastrado com sucesso.';
      titleError = 'Erro ao cadastrar funcionário.';
      form.value.estacionamento = this.estacionamento;
    }

    this.funcService.save(form.value).subscribe(
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
