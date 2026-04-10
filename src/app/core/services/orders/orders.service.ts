import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {

  private readonly httpClient = inject(HttpClient)


  creatCashOrderFromCart(prodId:any , data:any): Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v2/orders/${prodId}` , data)
  }

  checkoutSession(cartID: any, data: any) : Observable<any>{
    return this.httpClient.post(`${environment.baseURL}/api/v1/orders/checkout-session/${cartID}?url=${window.location.origin}`, data)
  }


  getUserOrders(userId: any) : Observable<any>{
    return this.httpClient.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`)
  }



}
