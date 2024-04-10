import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface IBaseRepository<T> {
  getAll(): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(payload: T): Observable<T>;
  put(id: string, payload: T): Observable<T>;
  delete(id: string): Observable<{ id: string; isTrusted: boolean }>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  endpoint = '';
  private http: HttpClient;
  protected constructor(http: HttpClient) {
    this.http = http;
  }

  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  getById(id: string): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  create(payload: T): Observable<T> {
    return this.http.post<T>(`${this.endpoint}`, payload);
  }

  put(id: string, payload: T): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, payload);
  }

  delete(id: string): Observable<{ id: string; isTrusted: boolean }> {
    return this.http.delete<{ id: string; isTrusted: boolean }>(
      `${this.endpoint}/${id}`,
    );
  }
}
