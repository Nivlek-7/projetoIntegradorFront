import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CrudService } from '../shared/crud-service';
import { Dono } from './../models/dono.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DonoService extends CrudService<Dono> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/dono`);
  }

  carregarSiMesmo(): Observable<Dono> {
    const headers = new HttpHeaders().set("Authorization", 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<Dono>(`${environment.API}/dono/listar`, { headers }).pipe(take(1));
  }

  register(dono: Dono) {
    return this.http.post(`${environment.API}/dono`, dono).pipe(take(1));
  }
}
