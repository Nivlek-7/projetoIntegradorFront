import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

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

  carregarSiMesmo(): Observable<Funcionario> {
    const headers = new HttpHeaders().set("Authorization", 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<Funcionario>(`${environment.API}/funcionario/listar`, { headers }).pipe(take(1));
  }

  update2(func): Observable<Funcionario> {
    const headers = new HttpHeaders().set("Authorization", 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.put<Funcionario>(`${environment.API}/funcionario/update2`, func, { headers }).pipe(take(1));
  }
}
