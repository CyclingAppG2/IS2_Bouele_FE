import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';
import { AdministratorGuard } from './_guards/administrator.guard';
import { VoluntaryGuard } from './_guards/voluntary.guard';
import { OrganizationGuard } from './_guards/organization.guard';

import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { EventFormComponent } from './event-form/event-form.component';
import { SignInAdminComponent } from './sign-in/sign-in-admin/sign-in-admin.component';
import { ContactComponent } from './contact/contact.component';
import { CompleteFormComponent } from './sign-up/complete-form/complete-form.component';
import { VolunteerHomeComponent, OrganizationHomeComponent, AdministratorHomeComponent } from './home';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LandingComponent, canActivate: [PublicGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [ PublicGuard ] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [ PublicGuard ] },
  { path: 'voluntary-home', component: VolunteerHomeComponent, canActivate: [ VoluntaryGuard ]},
  { path: 'organization-home', component: OrganizationHomeComponent, canActivate: [ OrganizationGuard ]},
  { path: 'administrator-home', component: AdministratorHomeComponent, canActivate: [ AdministratorGuard ]},
  { path: 'new-event', component: EventFormComponent, canActivate: [ProtectedGuard]},
  { path: 'admin-login', component: SignInAdminComponent, canActivate: [PublicGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'complete-form', component: CompleteFormComponent, canActivate: [ProtectedGuard]},
  { path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
