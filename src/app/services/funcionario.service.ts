import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CrudService } from './../shared/crud-service';
import { Funcionario } from './../models/funcionario.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FuncionarioService extends CrudService<Funcionario>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/funcionario`);
  }
}
