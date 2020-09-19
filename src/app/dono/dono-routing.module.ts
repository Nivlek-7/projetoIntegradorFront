
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthDonoGuard } from '../auth/guards/auth-dono.guard';

import { DonoComponent } from './dono.component';
import { EstacionamentoComponent } from './estacionamento/estacionamento.component';
import { FuncComponent } from './func/func.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

const routes: Routes = [
  {path: '', component: DonoComponent, canActivate: [AuthDonoGuard], children: [
    {path: '', redirectTo: 'estacionamento', pathMatch:'full'},
    {path: 'estacionamento', component: EstacionamentoComponent},
    {path: 'funcionario', component: FuncComponent},
    {path: 'relatorio', component: RelatorioComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonoRoutingModule { }
