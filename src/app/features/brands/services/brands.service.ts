import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appAPIs } from '../../../core/constants/appAPIs';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  http = inject(HttpClient);


  getAllBrands(): Observable<any>{
    return this.http.get(appAPIs.getAllBrands) ;
  }
}
