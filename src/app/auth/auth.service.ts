import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { catchError, mapTo, tap } from 'rxjs/operators';

import { LoginModel } from '../models/login.model';
import { RetornoLogin } from '../models/retornoLogin';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  login(user: LoginModel): Observable<boolean> {
    return this.http.post<any>(`${this.apiUrl}/authenticate`, user)
      .pipe(
        tap(retornoLogin => {
          this.doLoginUser(retornoLogin)
        }),
        mapTo(true),
        catchError(error => {
          alert(error.error.message || 'Erro no servidor');
          return of(false);
        }));
  }

  isLoggedIn() {
    return !!sessionStorage.getItem('token');
  }

  private doLoginUser(retornoLogin: RetornoLogin) {
    sessionStorage.setItem('token', retornoLogin.token)
    sessionStorage.setItem('nome', retornoLogin.nome)
    sessionStorage.setItem('id', retornoLogin.id.toString())
    sessionStorage.setItem('tipoUser', retornoLogin.tipoUser)
  }

}
