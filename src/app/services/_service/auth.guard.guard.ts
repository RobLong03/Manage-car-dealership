import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ServiceService } from './-service.service';
import { inject } from '@angular/core';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const service = inject(ServiceService);
  const router = inject(Router);

  if (localStorage.getItem("auth")!=null) {
    return true;
  } else {
    router.navigate(['/']);
    return false;
  }

};
