import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Item } from '../models/item';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class ItemService {
  http = inject(HttpClient);
  base = `${environment.apiUrl}/api/items`;

  list(): Observable<Item[]> {
    return this.http.get<Item[]>(this.base);
  }

  get(id: string): Observable<Item> {
    return this.http.get<Item>(`${this.base}/${id}`);
  }

  create(payload: Partial<Item>): Observable<Item> {
    return this.http.post<Item>(this.base, payload);
  }

  update(id: string, payload: Partial<Item>): Observable<Item> {
    return this.http.put<Item>(`${this.base}/${id}`, payload);
  }

  remove(id: string): Observable<any> {
    return this.http.delete(`${this.base}/${id}`);
  }
}
