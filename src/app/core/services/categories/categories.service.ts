import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private readonly httpClient = inject(HttpClient)

  getAllCategories() : Observable<any>{
    return this.httpClient.get(environment.baseURL + '/api/v1/categories')
  }


  getSpacificCategory(id: any): Observable<any>{
    return this.httpClient.get(`/api/v1/categories/${id}`)
  }


}
