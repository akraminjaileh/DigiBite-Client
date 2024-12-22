import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../config/ApiResponse';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiHandlerService {

  constructor(private http: HttpClient) { }

  get(url: string, query?: { [key: string]: any }): Observable<ApiResponse> {
    if (!query)
      return this.http.get<ApiResponse>(url)

    let params = new HttpParams();

    // Add query parameters dynamically
    for (const key in query) {
      if (query.hasOwnProperty(key) && query[key] != null) {
        params = params.set(key, query[key]);
      }
    }

    return this.http.get<ApiResponse>(url, { params });
  }

  post<T>(url: string, body: T): Observable<ApiResponse> {
    return this.http.post<ApiResponse>(url, body);
  }
  put(url: string, id: number, body: any) {
    return this.http.put<ApiResponse>(`${url}/${id}`, body);

  }
  delete(url: string, id: number) {
    return this.http.delete<ApiResponse>(`${url}/${id}`);
  }
}
