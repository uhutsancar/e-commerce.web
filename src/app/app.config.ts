import { ApplicationConfig, inject, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { environment } from '../environments/environment';
import { pathInterceptor } from '../interceptors/path-interceptor';
import { API_URL } from '../data-access/base-api';
import { tokenInterceptor } from '../interceptors/toke-interceptors';
import { AuthService } from '../services/auth.service';
import { provideClientHydration, withEventReplay, withHttpTransferCacheOptions } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),
    provideHttpClient(withInterceptors([
      pathInterceptor, 
      tokenInterceptor
    ]
    )),

    {
      provide: API_URL,
      useValue: environment.apiUrl,
    },

    provideAppInitializer(() => {
      const authService = inject(AuthService);
      authService.init();
    }),
    provideClientHydration(
      withEventReplay(),
      withHttpTransferCacheOptions({
        includeRequestsWithAuthHeaders: true,
      }
      )
    )

  ]
};
