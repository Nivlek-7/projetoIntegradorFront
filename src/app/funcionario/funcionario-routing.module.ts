import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthFuncGuard } from '../auth/guards/auth-func.guard';
import { FuncionarioComponent } from './funcionario.component';
import { ClienteComponent } from './cliente/cliente.component';

const routes: Routes = [
  {path: '', component: FuncionarioComponent, canActivate: [AuthFuncGuard], children: [
    {path: '', redirectTo: 'cliente', pathMatch:'full'},
    {path: 'cliente', component: ClienteComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
