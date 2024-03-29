import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {map, take} from "rxjs";
import {AuthService} from "../service/auth.service";

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  return authService.AuthenticatedUser$.pipe(
    take(1), // take the first one and then unsubscribe automatically
    map(user => {
      // check if route is restricted by role
      const { roles } = route.data;

      if(user && user.role && roles[0].includes(user.role.name)) {
        return true;
      }
      if(user) {
        return  router.createUrlTree(['/forbidden']);
      }
      return  router.createUrlTree(['/login']);
    })
  )
};
