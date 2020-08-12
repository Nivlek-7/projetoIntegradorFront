import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FuncionarioComponent } from './funcionario.component';
import { AuthFuncGuard } from '../auth/guards/auth-func.guard';

const routes: Routes = [
  {path: '', component: FuncionarioComponent, canActivate: [AuthFuncGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FuncionarioRoutingModule { }
