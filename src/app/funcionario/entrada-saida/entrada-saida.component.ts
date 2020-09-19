import { MarcarSaidaComponent } from './marcar-saida/marcar-saida.component';
import { Component, AfterViewInit, ViewChild, OnInit } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Entrada } from './../../models/entrada.model';
import { Estacionamento } from './../../models/estacionamento.model';
import { EntradaService } from './../../services/entrada.service';
import { FuncionarioService } from './../../services/funcionario.service';
import { ConfirmDialogService } from './../../shared/confirm-dialog.service';
import { SnackbarService } from './../../shared/snackbar.service';
import { RegistrarEntradaComponent } from './registrar-entrada/registrar-entrada.component';

@Component({
  selector: 'app-entrada-saida',
  templateUrl: './entrada-saida.component.html',
  styleUrls: ['./entrada-saida.component.css']
})
export class EntradaSaidaComponent implements AfterViewInit {

  displayedColumns: string[] = ['placa', 'modelo', 'cor', 'hora', 'funcionario', 'acoes'];
  entradas: MatTableDataSource<Entrada>;
  estacionamento: Estacionamento = new Estacionamento();

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private entradaService: EntradaService, private funcService: FuncionarioService ,private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService, private snackbarService: SnackbarService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    this.funcService.carregarSiMesmo().subscribe(data => this.estacionamento = data.estacionamento);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.entradaService!.list();
        }),
        catchError(() => observableOf([]))
      ).subscribe(data => {
        this.entradas = new MatTableDataSource<Entrada>(data);
        this.entradas.sort = this.sort;
        this.entradas.paginator = this.paginator;

        this.resultsLength = Object.keys(data).length;
      });
  }

  registrarEntrada() {
    const dialogRef = this.dialog.open(RegistrarEntradaComponent, {
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        window.location.reload();
      }
    })
  }

  marcarSaida(entrada: Entrada) {
    const dialogRef = this.dialog.open(MarcarSaidaComponent, {
      data: { entrada },
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      window.location.reload();
    })
  }

  excluirEntrada(id: number) {
    this.confirmDialog.openConfirmDialog('Excluir entrada').afterClosed().subscribe(
      result => {
        if (result) {
          this.entradaService.remove(id).subscribe(
            success => {
              this.snackbarService.success('Entrada deletada com sucesso.');
              window.location.reload();
            },
            error => this.snackbarService.error('Erro ao deletar entrada.')
          )
        }
      }
    )
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.entradas.filter = filterValue.trim().toLowerCase();
  }

}
