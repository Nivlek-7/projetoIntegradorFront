import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { CrudService } from '../shared/crud-service';
import { Cliente } from '../models/cliente.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService extends CrudService<Cliente>{

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/cliente`);
  }
}
