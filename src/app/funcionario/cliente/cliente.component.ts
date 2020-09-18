import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError } from 'rxjs/operators';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { Cliente } from './../../models/cliente.model';
import { Veiculo } from './../../models/veiculo.model';
import { ClienteService } from './../../services/cliente.service';
import { VeiculoService } from './../../services/veiculo.service';
import { ConfirmDialogService } from './../../shared/confirm-dialog.service';
import { SnackbarService } from './../../shared/snackbar.service';
import { ClienteFormComponent } from './cliente-form/cliente-form.component';
import { VeiculoFormComponent } from './veiculo-form/veiculo-form.component';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class ClienteComponent implements AfterViewInit {

  displayedColumns: string[] = ['nome', 'telefone', 'email', 'acoes'];
  clientes: MatTableDataSource<Cliente>;
  expandedElement: null;

  resultsLength = 0;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private clienteService: ClienteService, private veiculoService: VeiculoService, private dialog: MatDialog,
    private confirmDialog: ConfirmDialogService, private snackbarService: SnackbarService) { }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          return this.clienteService!.list();
        }),
        catchError(() => observableOf([]))
      ).subscribe(data => {
        data.forEach(cliente => {
          this.veiculoService.listByCliente(cliente.id).subscribe(data => cliente.veiculos = data);
        })


        this.clientes = new MatTableDataSource<Cliente>(data);
        this.clientes.sort = this.sort;
        this.clientes.paginator = this.paginator;

        this.resultsLength = Object.keys(data).length;
      });
  }

  cadastrarCliente() {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
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

  editarCliente(cliente: Cliente) {
    const dialogRef = this.dialog.open(ClienteFormComponent, {
      data: { ...cliente, buttonName: 'Editar' },
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        window.location.reload();
      }
    })
  }

  excluirCliente(id: number) {
    this.confirmDialog.openConfirmDialog('Excluir cliente').afterClosed().subscribe(
      result => {
        if (result) {
          this.clienteService.remove(id).subscribe(
            success => {
              this.snackbarService.success('Cliente deletado com sucesso.');
              window.location.reload();
            },
            error => this.snackbarService.error('Erro ao deletar cliente.')
          )
        }
      }
    )
  }

  cadastrarVeiculo(cliente: Cliente) {
    const dialogRef = this.dialog.open(VeiculoFormComponent, {
      data: {  cliente, buttonName: 'Cadastrar' },
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        window.location.reload();
      }
    })
  }

  editarVeiculo(veiculo: Veiculo) {
    const dialogRef = this.dialog.open(VeiculoFormComponent, {
      data: { ...veiculo, buttonName: 'Editar' },
      width: '400px',
      autoFocus: true
    });

    dialogRef.afterClosed().toPromise().then(data => {
      if (data) {
        window.location.reload();
      }
    })
  }

  excluirVeiculo(id: number) {
    this.confirmDialog.openConfirmDialog('Excluir veículo').afterClosed().subscribe(
      result => {
        if (result) {
          this.veiculoService.remove(id).subscribe(
            success => {
              this.snackbarService.success('Veículo deletado com sucesso.');
              window.location.reload();
            },
            error => this.snackbarService.error('Erro ao deletar veículo.')
          )
        }
      }
    )
  }

  aplicarFiltro(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.clientes.filter = filterValue.trim().toLowerCase();
  }

}
