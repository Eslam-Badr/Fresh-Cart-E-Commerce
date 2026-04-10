import { ApplicationConfig, importProvidersFrom, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import {provideAnimations} from '@angular/platform-browser/animations'
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { NgxSpinnerModule } from "ngx-spinner";
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { loaderInterceptor } from './core/interceptors/loader/loader-interceptor';
import { headerInterceptor } from './core/interceptors/header/header-interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    importProvidersFrom(NgxSpinnerModule),
    provideBrowserGlobalErrorListeners(),
    provideHttpClient(withFetch(), withInterceptors([loaderInterceptor , headerInterceptor])),
    provideRouter(routes), provideClientHydration(withEventReplay())
  ]
};
