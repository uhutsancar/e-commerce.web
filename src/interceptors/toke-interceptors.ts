import { HttpHandlerFn, HttpRequest } from '@angular/common/http';

import { inject } from '@angular/core';
import { API_URL } from '../data-access/base-api';
import { AuthService } from '../services/auth.service';


export const tokenInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const authService = inject(AuthService);

  req = req.clone({
  headers: req.headers.set(
    'Authorization', 
    'Bearer' + authService.accessToken
  )

  });
  return next(req);
};
