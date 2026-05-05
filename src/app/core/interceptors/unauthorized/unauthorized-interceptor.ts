import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MySwalMessageService } from '../../services/my-swal-message/my-swal-message.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {

  // inject
  let mySwalMessageService = inject(MySwalMessageService)
  let platformId = inject(PLATFORM_ID)
  let router = inject(Router)

  // catching error
  return next(req).pipe(catchError((err) => {

    // error message
    if (isPlatformBrowser(platformId)) {
      if (err.status == 401) {
        mySwalMessageService.errorMsg(err.error.message)
        router.navigate(['/login'])
      }

    }

    return throwError(() => err)
  }));
};
