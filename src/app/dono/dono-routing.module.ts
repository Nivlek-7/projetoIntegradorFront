import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonoComponent } from './dono.component';
import { AuthGuard } from '../auth/guards/auth.guard';

const routes: Routes = [
  {path: '', component: DonoComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DonoRoutingModule { }
