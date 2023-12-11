import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.getLogInFlag$().pipe(
    map(logInFlag => {
      if (logInFlag) {
        return true;
      } else {
        router.navigate(['/login']);
        return false;
      }
    })
  );
};
