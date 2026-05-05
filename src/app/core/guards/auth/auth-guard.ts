import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MySwalMessageService } from '../../services/my-swal-message/my-swal-message.service';

export const authGuard: CanActivateFn = (route, state) => {

  let platformId = inject(PLATFORM_ID)
  let router = inject(Router)
  let mySwalMessageService = inject(MySwalMessageService)


  if (isPlatformBrowser(platformId)) {
    if (localStorage.getItem('token')) {
      return true
    }else{

      mySwalMessageService.errorMsg('You have to be logged in')

      return router.parseUrl('/login')
    }
  }


  return true;
};
