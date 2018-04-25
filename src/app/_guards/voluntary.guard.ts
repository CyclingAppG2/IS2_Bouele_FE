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
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const isAuthenticated = !!localStorage.getItem('access-token');
      const isVoluntary = ( localStorage.getItem('role') === 'Voluntary');
      if ( !isVoluntary || !isAuthenticated ) {
        swal({
          title: 'Acceso Denegado',
          text: 'Solo puedes acceder a esta pagina si eres un voluntario',
          type: 'error',
          footer: 'Redirigiendo',
          timer: 2000
        });
        const role = localStorage.getItem('role');
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

  private isVoluntaryPage(state: RouterStateSnapshot): boolean {
    return state.url === this.administratorFallbackPageUri
      || state.url === this.organizationFallbackPageUri;
  }

  private navigate(url: string): void {
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      this.router.navigateByUrl(url);
    }
}
}
