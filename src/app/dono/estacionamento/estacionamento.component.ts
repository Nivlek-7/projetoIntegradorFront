import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Estacionamento } from './../../models/estacionamento.model';
import { EstacionamentoService } from './../../services/estacionamento.service';

@Component({
  selector: 'app-estacionamento',
  templateUrl: './estacionamento.component.html',
  styleUrls: ['./estacionamento.component.css']
})
export class EstacionamentoComponent implements AfterViewInit {

  displayedColumns: string[] = ['nome', 'endereco', 'telefone', 'valorPorHora', 'vagas', 'vagasDisponiveis', 'acoes'];
  dataSource: any;

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private estService: EstacionamentoService) {}

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
        this.dataSource = new MatTableDataSource<Estacionamento>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;

        this.resultsLength = Object.keys(data).length;
      });
  }
}
