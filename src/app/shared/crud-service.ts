import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take } from 'rxjs/operators';

export class CrudService<T> {

  constructor(protected http: HttpClient, private API_URL) {}

  list() {
    const headers = this.setarTokenHeader();
    return this.http.get<T[]>(this.API_URL, { headers });
  }

  loadByID(id) {
    const headers = this.setarTokenHeader();
    return this.http.get<T>(`${this.API_URL}/${id}`, { headers }).pipe(take(1));
  }

  private create(record: T, headers) {
    return this.http.post(this.API_URL, record, { headers }).pipe(take(1));
  }

  private update(record: T, headers) {
    return this.http.put(this.API_URL, record, { headers }).pipe(take(1));
  }

  save(record: T) {
    const headers = this.setarTokenHeader();
    if (record['id']) {
      return this.update(record, headers);
    }
    return this.create(record, headers);
  }

  remove(id) {
    const headers = this.setarTokenHeader();
    return this.http.delete(`${this.API_URL}/${id}`, { headers }).pipe(take(1));
  }

  private setarTokenHeader() {
    let token = sessionStorage.getItem('token');
    return new HttpHeaders().set("Authorization", 'Bearer ' + token);
  }
}
