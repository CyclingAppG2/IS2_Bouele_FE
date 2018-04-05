import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { EventFormComponent } from './event-form/event-form.component';
import { SignInAdminComponent } from './sign-in/sign-in-admin/sign-in-admin.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LandingComponent, canActivate: [PublicGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [ PublicGuard ] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [ PublicGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ ProtectedGuard ]},
  { path: 'new-event', component: EventFormComponent, canActivate: [ProtectedGuard]},
  { path: 'admin-login', component: SignInAdminComponent, canActivate: [PublicGuard]},
  { path: 'contact', component: ContactComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
