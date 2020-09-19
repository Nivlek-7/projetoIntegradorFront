import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { Saida } from './../../models/saida.model';
import { SaidaService } from './../../services/saida.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styleUrls: ['./relatorio.component.css']
})
export class RelatorioComponent implements AfterViewInit {

  displayedColumns: string[] = ['estacionamento', 'placa', 'modelo', 'cor', 'horaEntrada', 'horaSaida', 'valor', 'funcEnt', 'funcSaida'];
  saidas: MatTableDataSource<Saida>

  lucroTotal = 0;

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private saidaService: SaidaService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.saidaService!.list();
        }),
        catchError(() => observableOf([]))
      ).subscribe(data => {
        this.saidas = new MatTableDataSource<Saida>(data);
        this.saidas.sort = this.sort;
        this.saidas.paginator = this.paginator;

        data.forEach(saida => {
          this.lucroTotal = this.lucroTotal + saida.valorPago;
        })

        this.resultsLength = Object.keys(data).length;
      });
  }

}
