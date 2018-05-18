import { NgModule } from '@angular/core';
import {
  AuthModule,
  AUTH_SERVICE,
  PUBLIC_FALLBACK_PAGE_URI,
  PROTECTED_FALLBACK_PAGE_URI
} from 'ngx-auth';

import { TokenStorage } from './token-storage.service';
import { AuthenticationService } from './authentication.service';
import {
  ORGANIZATION_FALLBACK_PAGE_URI,
  VOLUNTARY_FALLBACK_PAGE_URI,
  ADMINISTRATOR_FALLBACK_PAGE_URI,
  UNCOMPLETED_FALLBACK_PAGE_URI
} from '../../_guards/tokens';

export function factory(authenticationService: AuthenticationService) {
  return authenticationService;
}

@NgModule({
  imports: [AuthModule],
  providers: [
    TokenStorage,
    AuthenticationService,
    { provide: PROTECTED_FALLBACK_PAGE_URI, useValue: '/' },
    { provide: PUBLIC_FALLBACK_PAGE_URI, useValue: '/sign-up' },
    { provide: ADMINISTRATOR_FALLBACK_PAGE_URI, useValue: '/administrator-home' },
    { provide: VOLUNTARY_FALLBACK_PAGE_URI, useValue: '/voluntary-home' },
    { provide: ORGANIZATION_FALLBACK_PAGE_URI, useValue: '/organization-home' },
    { provide: UNCOMPLETED_FALLBACK_PAGE_URI, useValue: '/complete-form' },

    {
      provide: AUTH_SERVICE,
      deps: [AuthenticationService],
      useFactory: factory
    }
  ]
})
export class AuthenticationModule {

}
