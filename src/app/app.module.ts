import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInUserComponent } from './sign-in/sign-in-user/sign-in-user.component';
import { SignInOrgComponent } from './sign-in/sign-in-org/sign-in-org.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpUserComponent } from './sign-up/sign-up-user/sign-up-user.component';
import { SignUpOrgComponent } from './sign-up/sign-up-org/sign-up-org.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignInComponent,
    SignInUserComponent,
    SignInOrgComponent,
    SignUpComponent,
    SignUpUserComponent,
    SignUpOrgComponent
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
