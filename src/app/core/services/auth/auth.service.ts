import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { IJwt } from '../../models/IJwt/IJwt.interface';
import { jwtDecode } from 'jwt-decode';
import { OrdersService } from '../orders/orders.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor() {
    this.decodeToken();
  }

  private readonly http = inject(HttpClient)
  private readonly ordersService = inject(OrdersService)
  private readonly platformId = inject(PLATFORM_ID)


  userId: WritableSignal<string | null> = signal(null);
  userData: WritableSignal<IJwt | null> = signal(null)


  register(data: any): Observable<any> {
    return this.http.post(environment.baseURL + '/api/v1/auth/signup', data)
  }


  login(data: any): Observable<any> {
    return this.http.post(environment.baseURL + '/api/v1/auth/signin', data)
  }


  forgetPassword(data: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/v1/auth/forgotPasswords`, data)
  }

  verifyResetCode(data: any): Observable<any> {
    return this.http.post(`${environment.baseURL}/api/v1/auth/verifyResetCode`, data)
  }

  resetPassword(data: any): Observable<any> {
    return this.http.put(`${environment.baseURL}/api/v1/auth/resetPassword`, data)
  }


  decodeToken() {
    if (isPlatformBrowser(this.platformId)) {
      let token = localStorage.getItem('token')
      if (token) {
        let decodedToken = jwtDecode<IJwt>(token);
        this.userData.set(decodedToken)
        console.log('decodedToken code: ' + JSON.stringify(decodedToken));

        this.userId.set(decodedToken.id)

        console.log('user id: ' + this.userData()?.id);

      }
    }
  }

  getUserId() {
    return this.userId()
  }


}
