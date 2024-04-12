import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IDeleteResponse } from '../../types/delete-response';
import { IFilter } from '../../types/filter';

export interface IBaseRepository<T> {
  getAll(filter: IFilter): Observable<T[]>;
  getById(id: string): Observable<T>;
  create(payload: T): Observable<T>;
  put(id: string, payload: T): Observable<T>;
  delete(id: string): Observable<IDeleteResponse>;
}

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  endpoint = '';
  private http: HttpClient;
  protected constructor(http: HttpClient, endpoint: string) {
    this.http = http;
    this.endpoint = environment.apiUrl + endpoint;
  }

  getAll(filter: IFilter): Observable<T[]> {
    const params = new HttpParams().appendAll(filter);
    return this.http.get<T[]>(this.endpoint, { params });
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

  delete(id: string): Observable<IDeleteResponse> {
    return this.http.delete<IDeleteResponse>(`${this.endpoint}/${+id}`);
  }
}
