import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { RetornoLogin } from './../models/retornoLogin';
import { LoginModel } from '../models/login.model';
import { Dono } from '../models/dono.model';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtClientService {

  private readonly API = environment.API;

  constructor(private http: HttpClient) { }

  public generateToken(request: LoginModel): Observable<RetornoLogin>{
    return this.http.post<RetornoLogin>(`${this.API}/authenticate`, request).pipe(take(1));
  }

  public teste(token: string): Observable<Dono[]> {
    let tokenStr='Bearer ' + token;
    const headers = new HttpHeaders().set("Authorization", tokenStr)
    return this.http.get<Dono[]>(`${this.API}/dono`, {headers});
  }

  setarTokenHeader(token: string) {
    return new HttpHeaders().set("Authorization", 'Bearer ' + token);
  }
}
