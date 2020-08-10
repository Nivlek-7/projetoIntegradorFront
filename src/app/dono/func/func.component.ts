import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Funcionario } from './../../models/funcionario.model';
import { FuncionarioService } from './../../services/funcionario.service';
import { ConfirmDialogService } from './../../shared/confirm-dialog.service';
import { SnackbarService } from './../../shared/snackbar.service';
import { FuncFormComponent } from './func-form/func-form.component';


@Component({
  selector: 'app-func',
  templateUrl: './func.component.html',
  styleUrls: ['./func.component.css']
})
export class FuncComponent implements AfterViewInit {

  displayedColumns: string[] = ['nome', 'cpf', 'endereco', 'telefone', 'estacionamento', 'acoes'];
  funcionarios: MatTableDataSource<Funcionario>;

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private funcService: FuncionarioService, private dialog: MatDialog, private confirmDialog: ConfirmDialogService,
    private snackbarService: SnackbarService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.funcService!.list();
        }),
        catchError(() => observableOf([]))
      ).subscribe(data => {
        this.funcionarios = new MatTableDataSource<Funcionario>(data);
        this.funcionarios.sort = this.sort;
        this.funcionarios.paginator = this.paginator;

        this.resultsLength = Object.keys(data).length;
      });
  }

  cadastrarFuncionario() {
    const dialogRef = this.dialog.open(FuncFormComponent, {
      data: {  buttonName: 'Cadastrar' },
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        window.location.reload();
      }
    })
  }

  editarFuncionario(funcionario: Funcionario) {
    const dialogRef = this.dialog.open(FuncFormComponent, {
      data: { ...funcionario, buttonName: 'Editar' },
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        window.location.reload();
      }
    })
  }

  excluirFuncionario(id: number) {
    this.confirmDialog.openConfirmDialog('Excluir funcionário').afterClosed().subscribe(
      result => {
        if (result) {
          this.funcService.remove(id).subscribe(
            success => {
              this.snackbarService.success('Funcionário deletado com sucesso.');
              window.location.reload();
            },
            error => this.snackbarService.error('Erro ao deletar funcionário.')
          )
        }
      }
    )
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.funcionarios.filter = filterValue.trim().toLowerCase();
  }
}
