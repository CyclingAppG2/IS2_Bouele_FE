import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard, ProtectedGuard } from 'ngx-auth';

import { LandingComponent } from './landing/landing.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: '', component: LandingComponent, canActivate: [PublicGuard] },
  { path: 'sign-in', component: SignInComponent, canActivate: [ PublicGuard ] },
  { path: 'sign-up', component: SignUpComponent, canActivate: [ PublicGuard ] },
  { path: 'home', component: HomeComponent, canActivate: [ ProtectedGuard ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
