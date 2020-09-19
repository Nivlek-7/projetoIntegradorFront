import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { FuncionarioRoutingModule } from './funcionario-routing.module';
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
import { MatDividerModule } from '@angular/material/divider';

import { FuncionarioComponent } from './funcionario.component';
import { ClienteComponent } from './cliente/cliente.component';
import { ClienteFormComponent } from './cliente/cliente-form/cliente-form.component';
import { VeiculoFormComponent } from './cliente/veiculo-form/veiculo-form.component';
import { EntradaSaidaComponent } from './entrada-saida/entrada-saida.component';
import { RegistrarEntradaComponent } from './entrada-saida/registrar-entrada/registrar-entrada.component';
import { MarcarSaidaComponent } from './entrada-saida/marcar-saida/marcar-saida.component';

@NgModule({
  declarations: [
    FuncionarioComponent,
    ClienteComponent,
    ClienteFormComponent,
    VeiculoFormComponent,
    EntradaSaidaComponent,
    RegistrarEntradaComponent,
    MarcarSaidaComponent
  ],
  imports: [
    CommonModule,
    FuncionarioRoutingModule,
    FormsModule,
    TextMaskModule,
    SharedModule,
    MatSidenavModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    MatDialogModule,
    MatSelectModule,
    MatDividerModule
  ]
})
export class FuncionarioModule { }
