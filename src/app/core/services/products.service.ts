import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { appAPIs } from '../constants/appAPIs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(filters?:{}):Observable<any> {
    return this.http.get(appAPIs.allProducts + `?${new URLSearchParams(filters as any).toString()}`);
  }

  getProductById(id: string): Observable<any> {
    return this.http.get(appAPIs.productDetails.replace(':id', id));
  }
}
