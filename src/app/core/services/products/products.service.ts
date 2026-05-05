import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private readonly httpClient = inject(HttpClient)



  getAllProducts(pageNum: any = 1, brandId?: any): Observable<any> {
    const params: any = { page: pageNum };
    if (brandId != null) params.brand = brandId;
    return this.httpClient.get(environment.baseURL + `/api/v1/products`, {
      params
    })
  }


  getSpecificProduct(productID: string | null): Observable<any> {
    return this.httpClient.get(environment.baseURL + `/api/v1/products/${productID}`)
  }


}
