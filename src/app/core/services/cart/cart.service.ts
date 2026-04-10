import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly httpClient = inject(HttpClient)



  addProductToCart(prodId:any): Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v2/cart`, {
      productId: prodId
    })
  }

  getLoggedInUser(): Observable<any>{
    return this.httpClient.get(`${environment.baseURL}/api/v2/cart`)
  }

  updateCartProductQuantity(productId:any, itemCount:any): Observable<any>{
    return this.httpClient.put(`${environment.baseURL}/api/v2/cart/${productId}`, {
      count: itemCount
    })
  }

  removeProductFromCart(productId:any): Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/api/v2/cart/${productId}`)
  }

  deleteUserCart(): Observable<any>{
    return this.httpClient.delete(`${environment.baseURL}/api/v2/cart`)
  }


  
}
