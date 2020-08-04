import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/guards/auth.guard';

import { DonoComponent } from './dono.component';
import { EstacionamentoComponent } from './estacionamento/estacionamento.component';

const routes: Routes = [
  {path: '', component: DonoComponent, canActivate: [AuthGuard], children: [
    {path: '', redirectTo: 'estacionamento', pathMatch:'full'},
    {path: 'estacionamento', component: EstacionamentoComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonoRoutingModule { }
