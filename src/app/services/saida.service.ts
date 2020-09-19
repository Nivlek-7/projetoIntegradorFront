import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/crud-service';
import { Saida } from './../models/saida.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaidaService extends CrudService<Saida> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/saida`);
  }
}
