import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/crud-service';
import { Entrada } from './../models/entrada.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EntradaService extends CrudService<Entrada> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/entrada`);
  }
}
