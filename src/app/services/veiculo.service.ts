import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { CrudService } from '../shared/crud-service';
import { Veiculo } from './../models/veiculo.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VeiculoService extends CrudService<Veiculo> {

  constructor(protected http: HttpClient) {
    super(http, `${environment.API}/veiculo`);
  }

  listByCliente(id: number): Observable<Veiculo[]> {
    const headers = new HttpHeaders().set("Authorization", 'Bearer ' + sessionStorage.getItem('token'));
    return this.http.get<Veiculo[]>(`${environment.API}/veiculo/listByCliente/${id}`, { headers }).pipe(take(1));
  }
}
