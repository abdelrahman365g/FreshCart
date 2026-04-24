import { HttpInterceptorFn } from '@angular/common/http';
import { Stored_Keys } from '../constants/Stored_Keys';

export const handleHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(Stored_Keys.USER_TOKEN);
  
  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
        token : token
      }
    });
  }

  return next(req);
};
