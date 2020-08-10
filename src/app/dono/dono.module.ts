import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { DonoRoutingModule } from './dono-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';

import { DonoComponent } from './dono.component';
import { EstacionamentoComponent } from './estacionamento/estacionamento.component';
import { EstacFormComponent } from './estacionamento/estac-form/estac-form.component';
import { FuncComponent } from './func/func.component';
import { FuncFormComponent } from './func/func-form/func-form.component';

@NgModule({
  declarations: [
    DonoComponent,
    EstacionamentoComponent,
    EstacFormComponent,
    FuncComponent,
    FuncFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TextMaskModule,
    SharedModule,
    DonoRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule
  ]
})
export class DonoModule { }
