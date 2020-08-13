import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { FuncionarioService } from './../../../services/funcionario.service';
import { SnackbarService } from '../../snackbar.service';

@Component({
  selector: 'app-edit-funcionario',
  templateUrl: './edit-funcionario.component.html',
  styleUrls: ['./edit-funcionario.component.css']
})
export class EditFuncionarioComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditFuncionarioComponent>, private service: FuncionarioService, private snackbarService: SnackbarService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.service.update2(form.value).subscribe(
      success => {
        this.snackbarService.success('Editado com sucesso.');
        this.dialogRef.close(form.value);
      }, error => {
        this.snackbarService.error('Erro ao editar os dados.');
        this.dialogRef.close();
      }
    )
  }

}
