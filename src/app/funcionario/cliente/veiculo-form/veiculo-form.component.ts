import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { VeiculoService } from './../../../services/veiculo.service';
import { SnackbarService } from './../../../shared/snackbar.service';

@Component({
  selector: 'app-veiculo-form',
  templateUrl: './veiculo-form.component.html',
  styleUrls: ['./veiculo-form.component.css']
})
export class VeiculoFormComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<VeiculoFormComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private veiculoService: VeiculoService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    let titleSuccess: string;
    let titleError: string;

    if (form.value.id) {
      titleSuccess = 'Veículo editado com sucesso.';
      titleError = 'Erro ao editar veículo.';
    } else {
      titleSuccess = 'Veículo cadastrado com sucesso.';
      titleError = 'Erro ao cadastrar veículo.';
    }

    this.veiculoService.save(form.value).subscribe(
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
