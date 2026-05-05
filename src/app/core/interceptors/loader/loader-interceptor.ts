import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {

  let ngxSpinner = inject(NgxSpinnerService)

  ngxSpinner.show()


  return next(req).pipe(finalize(() => {
    ngxSpinner.hide()
  }));
};
