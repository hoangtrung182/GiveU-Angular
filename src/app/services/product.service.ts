import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Iproduct } from '../interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  URL = 'http://localhost:3000/products';
  constructor(private http: HttpClient) { }

  getAll():Observable<Iproduct[]> {
    return this.http.get<Iproduct[]>(this.URL);
  }

  getProduct(id: number): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.URL}/${id}`);
  }

  addProduct(product: Iproduct): Observable<Iproduct> {
    return this.http.post<Iproduct>(this.URL, product);
  }

  removeProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.URL}/${id}`);
  }

  updateProduct(product: Iproduct): Observable<any> {
    return this.http.put<any>(`${this.URL}/${product.id}`, product);
  }
}
