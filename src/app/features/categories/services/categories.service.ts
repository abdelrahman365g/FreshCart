import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { appAPIs } from '../../../core/constants/appAPIs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private http = inject(HttpClient);

  getAllCategories(): Observable<any> {
    return this.http.get(appAPIs.getAllCategories);
  }

  getSpecificCategory(id: string): Observable<any> {
    return this.http.get(appAPIs.getSpecificCategory.replace(':id', id));
  }

  getAllSubcategories(): Observable<any> {
    return this.http.get(appAPIs.getAllSubcategories);
  }

  getSpecificSubcategory(id: string): Observable<any> {
    return this.http.get(appAPIs.getSpecificSubcategory.replace(':id', id));
  }

  getSubcategoriesByCategory(id: string): Observable<any> {
    return this.http.get(appAPIs.getSubcategoriesByCategory.replace(':id', id));
  }
}
