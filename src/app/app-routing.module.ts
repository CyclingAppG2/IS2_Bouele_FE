import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';
import { AdministratorGuard } from './_guards/administrator.guard';
import { VoluntaryGuard } from './_guards/voluntary.guard';
import { OrganizationGuard } from './_guards/organization.guard';

import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { SignInAdminComponent } from './shared/sign-in/sign-in-admin/sign-in-admin.component';
import { ContactComponent } from './contact/contact.component';
import { CompleteFormComponent } from './shared/sign-up/complete-form/complete-form.component';
import { VolunteerHomeComponent, OrganizationHomeComponent, AdministratorHomeComponent } from './home';
import { NotFoundComponent } from './not-found/not-found.component';
import { VoluntaryProfileComponent } from './profile/voluntary-profile/voluntary-profile.component';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { UncompletedGuard } from './_guards/uncompleted.guard';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LandingComponent, canActivate: [PublicGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [ PublicGuard ] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [ PublicGuard ] },
  { path: 'voluntary-home', component: VolunteerHomeComponent, canActivate: [ VoluntaryGuard, UncompletedGuard ]},
  { path: 'organization-home', component: OrganizationHomeComponent, canActivate: [ OrganizationGuard, UncompletedGuard ]},
  { path: 'administrator-home', component: AdministratorHomeComponent, canActivate: [ AdministratorGuard, UncompletedGuard ]},
  { path: 'new-event', component: EventFormComponent, canActivate: [OrganizationGuard]},
  { path: 'admin-login', component: SignInAdminComponent, canActivate: [PublicGuard]},
  { path: 'contact', component: ContactComponent},
  { path: 'complete-form', component: CompleteFormComponent, canActivate: [ProtectedGuard]},
  { path: 'profile', component: VoluntaryProfileComponent, canActivate: [UncompletedGuard] },
  { path: 'event-detail/:id', component: EventDetailComponent },
  { path: '**', component: NotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
