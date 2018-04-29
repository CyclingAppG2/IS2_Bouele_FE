import { Injectable, Inject } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from '../_services';
import swal from 'sweetalert2';
import { VOLUNTARY_FALLBACK_PAGE_URI, ORGANIZATION_FALLBACK_PAGE_URI } from './tokens';

@Injectable()
export class AdministratorGuard implements CanActivate {

  constructor(
    @Inject(ORGANIZATION_FALLBACK_PAGE_URI) private organizationFallbackPageUri: string,
    @Inject(VOLUNTARY_FALLBACK_PAGE_URI) private voluntaryFallbackPageUri: string,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = !!localStorage.getItem('access-token');
    const isAdministrator = localStorage.getItem('role') === 'Administrator';
    if (!isAuthenticated || !isAdministrator) {
      const role = localStorage.getItem('role');
      swal({
        title: 'Acceso Denegado',
        text: 'Solo puedes acceder a esta pagina si eres un administrador \n has sido redirigido a tu inicio',
        type: 'error',
      });
      switch (role) {
        case 'Administrator':
          this.navigate(this.organizationFallbackPageUri);
          break;
        case 'Voluntary':
          this.navigate(this.voluntaryFallbackPageUri);
          break;
      }
      return false;
    }
    return true;
  }

  private navigate(url: string): void {
    console.log(url);
    if (url.startsWith('http')) {
      window.location.href = url;
    } else {
      this.router.navigateByUrl(url);
    }

  }
}
