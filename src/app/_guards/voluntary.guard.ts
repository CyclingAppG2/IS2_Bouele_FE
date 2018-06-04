import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_services';
import swal from 'sweetalert2';
import { ORGANIZATION_FALLBACK_PAGE_URI, ADMINISTRATOR_FALLBACK_PAGE_URI } from './tokens';

@Injectable()
export class VoluntaryGuard implements CanActivate {

  constructor(
    @Inject(ADMINISTRATOR_FALLBACK_PAGE_URI) private administratorFallbackPageUri: string,
    @Inject(ORGANIZATION_FALLBACK_PAGE_URI) private organizationFallbackPageUri: string,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = !!localStorage.getItem('access-token');
    const isVoluntary = localStorage.getItem('role') === 'Voluntary';
    if (!isAuthenticated || !isVoluntary) {
      const role = localStorage.getItem('role');
      swal({
        title: 'Acceso Denegado',
        text: 'Solo puedes acceder a esta pagina si eres un voluntario \n has sido redirigido a tu inicio',
        type: 'error',
      });
      switch (role) {
        case 'Administrator':
          this.navigate(this.administratorFallbackPageUri);
          break;
        case 'Organization':
          this.navigate(this.organizationFallbackPageUri);
          break;
      }
      return false;
    }
    return true;
  }

  private navigate(url: string): void {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      this.router.navigateByUrl(url);
    }

  }
}
