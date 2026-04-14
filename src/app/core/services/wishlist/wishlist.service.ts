import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private readonly httpClient = inject(HttpClient)

  addProductToWishlist(prodId: any): Observable<any> {
    return this.httpClient.post(`${environment.baseURL}/api/v1/wishlist`, {
      productId: prodId
    })
  }

  deleteProductToWishlist(prodId: any): Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/api/v1/wishlist/${prodId}`)
  }

  getUserProductWishlist(): Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/api/v1/wishlist`)
  }


}
