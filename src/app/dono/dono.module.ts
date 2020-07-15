import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DonoRoutingModule } from './dono-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav'

import { DonoComponent } from './dono.component';

@NgModule({
  declarations: [
    DonoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    DonoRoutingModule,
    MatSidenavModule
  ]
})
export class DonoModule { }
