import { Injectable, Inject, InjectionToken } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_services';
import { AUTH_SERVICE, AuthService, PUBLIC_FALLBACK_PAGE_URI } from 'ngx-auth';
import { map } from '../_utils/rxjs.util';

@Injectable()
export class AdminGuard implements CanActivate {

  ADMIN_FALLBACK_PAGE_URI = new InjectionToken('PROTECTED_FALLBACK_PAGE_URI');

  constructor(
    @Inject(AUTH_SERVICE)private authService: AuthService,
    @Inject(PUBLIC_FALLBACK_PAGE_URI) private publicFallbackPageUri: string,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return map(
        this.authService .isAuthorized(),
        (isAuthorized: boolean) => {

          if (!isAuthorized && !this.isPublicPage(state)) {
            this.navigate(this.publicFallbackPageUri);

            return false;
          }

          return true;
        }
  );
    }


  /**
   * CanActivateChild handler
   */
  public canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.canActivate(route, state);
  }

  /**
   * Check, if current page is public fallback page
   */
  private isPublicPage(state: RouterStateSnapshot): boolean {
    return state.url === this.publicFallbackPageUri;
  }

  /**
   * Navigate away from the app / path
   */
  private navigate(url: string): void {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      this.router.navigateByUrl(url);
    }
}
}
