import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  get<T>(url: string) {
    return this.httpClient.get<T>(url);
  }

  post<T>(url: string, body: any) {
    return this.httpClient.post<T>(url, body);
  }

  put<T>(url: string, body: any) {
    return this.httpClient.put<T>(url, body);
  }

  delete<T>(url: string) {
    return this.httpClient.delete<T>(url);
  }
}
