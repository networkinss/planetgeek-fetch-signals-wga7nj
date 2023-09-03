import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FetchService {
  
  async post<TIn, TOut>(path: string, value: TIn) {
    const body = JSON.stringify(value);
    const response = await fetch(this.toUrl(path), {
      method: 'POST',
      body: body,
      headers: this.getHeaders(),
    });
    const json = await response.json();
    return json as TOut;
  }

  async getObject<T>(path: string) {
    const response = await fetch(this.toUrl(path), {
      method: 'GET',
      headers: this.getHeaders(),
    });
    const json = await response.json();
    return json as T;
  }

  private toUrl = (path: string) =>
    `https://jsonplaceholder.typicode.com${path}`;

  private getHeaders(): HeadersInit {
    const token = '<someToken>';
    return {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8',
    };
  }
}
