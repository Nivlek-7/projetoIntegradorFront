import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { DonoService } from 'src/app/services/dono.service';
import { SnackbarService } from '../../snackbar.service';

@Component({
  selector: 'app-edit-dono',
  templateUrl: './edit-dono.component.html',
  styleUrls: ['./edit-dono.component.css']
})
export class EditDonoComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<EditDonoComponent>, private service: DonoService, private snackbarService: SnackbarService,
     @Inject(MAT_DIALOG_DATA) public data: any) { }

  public mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.service.save(form.value).subscribe(
      success => {
        sessionStorage.setItem('nome', form.value.nome)
        this.snackbarService.success('Editado com sucesso.')
        this.dialogRef.close(form.value);
      }, error => {
        this.snackbarService.error('Erro ao editar os dados.')
        this.dialogRef.close();
      }
    )
  }

}
