import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { EditDonoComponent } from './../modals/edit-dono/edit-dono.component';
import { EditFuncionarioComponent } from './../modals/edit-funcionario/edit-funcionario.component';
import { Dono } from './../../models/dono.model';
import { Funcionario } from './../../models/funcionario.model';
import { DonoService } from './../../services/dono.service';
import { FuncionarioService } from './../../services/funcionario.service';
import { SnackbarService } from './../snackbar.service';
import { ConfirmDialogService } from '../confirm-dialog.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  dono: Dono = new Dono();
  func: Funcionario = new Funcionario();
  mostrarExcluir: boolean;

  constructor(private router: Router, private dialog: MatDialog, private donoService: DonoService, private funcService: FuncionarioService,
    private dialogService: ConfirmDialogService, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('tipoUser') === 'dono') {
      this.mostrarExcluir = true;
      this.donoService.carregarSiMesmo().subscribe(data => this.dono = data);
    } else {
      this.mostrarExcluir = false;
      this.funcService.carregarSiMesmo().subscribe(data => this.func = data);
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
      this.dialogEditFuncionario();
    }
  }

  dialogEditDono() {
    const dialogRef = this.dialog.open(EditDonoComponent, {
      data: { dono: this.dono },
      width: '350px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.dono = data;
        sessionStorage.setItem('nome', this.dono.nome);
      }
    })
  }

  dialogEditFuncionario() {
    const dialogRef = this.dialog.open(EditFuncionarioComponent, {
      data: { func: this.func },
      width: '350px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        this.func = data;
        sessionStorage.setItem('nome', this.func.nome);
      }
    })
  }

  modalExcluir() {
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
  }
}
