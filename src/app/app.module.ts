import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';

import { ConfirmEqualValidatorDirective} from './_validators/confirm-equal-validator.directive';

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
    SignUpOrgComponent,
    ConfirmEqualValidatorDirective
  ],
  imports: [NgbModule.forRoot(), BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
