import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonoRoutingModule } from './dono-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { DonoComponent } from './dono.component';
import { EstacionamentoComponent } from './estacionamento/estacionamento.component';

@NgModule({
  declarations: [
    DonoComponent,
    EstacionamentoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DonoRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class DonoModule { }
