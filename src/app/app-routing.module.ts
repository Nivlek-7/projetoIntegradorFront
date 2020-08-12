import { FuncionarioModule } from './funcionario/funcionario.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'dono', loadChildren: () => import('./dono/dono.module').then(m => m.DonoModule) },
  { path: 'funcionario', loadChildren: () => import('./funcionario/funcionario.module').then(m => m.FuncionarioModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
