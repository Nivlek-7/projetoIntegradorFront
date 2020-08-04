import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/crud-service';
import { Estacionamento } from './../models/estacionamento.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstacionamentoService extends CrudService<Estacionamento>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/estacionamento`);
  }

}
