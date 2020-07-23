import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { EditDonoComponent } from '../modals/edit-dono/edit-dono.component';
import { Dono } from './../../models/dono.model';
import { DonoService } from 'src/app/services/dono.service';
import { SnackbarService } from './../snackbar.service';
import { ConfirmDialogService } from '../confirm-dialog.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dono: Dono = new Dono();

  constructor(private router: Router, private dialog: MatDialog, private donoService: DonoService, private dialogService: ConfirmDialogService,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('tipoUser') === 'dono') {
      this.donoService.carregarSiMesmo()
        .subscribe(data => this.dono = data)
    } else {

    }


  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  modalEditar() {
    if (sessionStorage.getItem('tipoUser') === 'dono') {
      this.dialogEditDono();
    } else {

    }
  }

  dialogEditDono() {
    let config: MatDialogConfig = {
      data: { dono: this.dono },
      width: '350px',
      autoFocus: true
    }

    const dialogRef = this.dialog.open(EditDonoComponent, config);

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.dono = data;
      }
    })

  }

  modalExcluir() {
    if (sessionStorage.getItem('tipoUser') === 'dono') {
      this.dialogService.openConfirmDialog('Excluir dono').afterClosed()
        .subscribe(result => {
          if (result) {
            this.donoService.remove(sessionStorage.getItem('id'))
              .subscribe(success => {
                this.logout();
                this.snackbarService.success('Dono deletado com sucesso.');
              }, error => {
                this.snackbarService.error('Erro ao deletar dono.')
              })
          }
        });
    } else {

    }
  }
}
