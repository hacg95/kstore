import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { retry } from 'rxjs/operators';

import { CreateProductDTO, Product, UpdateProductDTO } from '../product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  private apiUrl = 'https://young-sands-07814.herokuapp.com/api/products';

  constructor(
    private http: HttpClient
  ) { }

  getAllProducts(limit?: number, offset?: number) {
    let params = new HttpParams()
    if (limit !== undefined && offset !== undefined){
      params = params.set('limit', limit);
      params = params.set('offset', offset)
    }
    return this.http.get<Product[]>(this.apiUrl, {params}).pipe(retry(3));
  }

  getProduct(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`)
  }

  // getProductByPage(limit:number, offset:number) {
  //   return this.http.get<Product[]>(`${this.apiUrl}`, {params: {limit, offset}})
  // }

  create(data: CreateProductDTO) {
    return this.http.post<Product>(this.apiUrl, data);
  }

  update(id: string, data: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
