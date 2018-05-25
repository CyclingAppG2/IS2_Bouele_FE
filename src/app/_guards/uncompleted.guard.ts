import {Injectable, Inject} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import swal from 'sweetalert2';
import {UNCOMPLETED_FALLBACK_PAGE_URI} from './tokens';

@Injectable()
export class UncompletedGuard implements CanActivate {

  constructor(
    @Inject(UNCOMPLETED_FALLBACK_PAGE_URI) private uncompletedFallbackPageUri: string,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const isAuthenticated = !!localStorage.getItem('access-token');
    const hasARole = localStorage.getItem('role') === 'undefined';
    if (!isAuthenticated || hasARole) {
      const role = localStorage.getItem('role');
      swal({
        title: 'Acceso Denegado',
        text: 'Debes terminar tu registro antes de continuar',
        type: 'error',
      });
      this.navigate(this.uncompletedFallbackPageUri);
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

