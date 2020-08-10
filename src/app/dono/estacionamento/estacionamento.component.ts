import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { EstacFormComponent } from './estac-form/estac-form.component';
import { Estacionamento } from './../../models/estacionamento.model';
import { EstacionamentoService } from './../../services/estacionamento.service';
import { SnackbarService } from './../../shared/snackbar.service';
import { ConfirmDialogService } from '../../shared/confirm-dialog.service';

@Component({
  selector: 'app-estacionamento',
  templateUrl: './estacionamento.component.html',
  styleUrls: ['./estacionamento.component.css']
})
export class EstacionamentoComponent implements AfterViewInit {

  displayedColumns: string[] = ['nome', 'endereco', 'telefone', 'valorPorHora', 'vagas', 'vagasDisponiveis', 'acoes'];
  estacionamentos: MatTableDataSource<Estacionamento>;

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estService: EstacionamentoService, private dialog: MatDialog, private confirmDialog: ConfirmDialogService,
    private snackbarService: SnackbarService) {}

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.estService!.list();
        }),
        catchError(() => observableOf([]))
      ).subscribe(data => {
        this.estacionamentos = new MatTableDataSource<Estacionamento>(data);
        this.estacionamentos.sort = this.sort;
        this.estacionamentos.paginator = this.paginator;

        this.resultsLength = Object.keys(data).length;
      });
  }

  cadastrarEstacionamento() {
    const dialogRef = this.dialog.open(EstacFormComponent, {
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

  editarEstacionamento(estacionamento: Estacionamento) {
    const dialogRef = this.dialog.open(EstacFormComponent, {
      data: { ...estacionamento, buttonName: 'Editar' },
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        window.location.reload();
      }
    })
  }

  excluirEstacionamento(id: number) {
    this.confirmDialog.openConfirmDialog('Excluir estacionamento').afterClosed().subscribe(
      result => {
        if (result) {
          this.estService.remove(id).subscribe(
            success => {
              this.snackbarService.success('Estacionamento deletado com sucesso.');
              window.location.reload();
            },
            error => this.snackbarService.error('Erro ao deletar estacionamento.')
          )
        }
      }
    )
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.estacionamentos.filter = filterValue.trim().toLowerCase();
  }
}
