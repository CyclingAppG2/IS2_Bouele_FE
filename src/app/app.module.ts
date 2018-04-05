import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { ConfirmEqualValidatorDirective } from './_validators/confirm-equal-validator.directive';

import { AuthenticationModule } from './_services/authentication/authentication.module';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInUserComponent } from './sign-in/sign-in-user/sign-in-user.component';
import { SignInOrgComponent } from './sign-in/sign-in-org/sign-in-org.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignUpUserComponent } from './sign-up/sign-up-user/sign-up-user.component';
import { SignUpOrgComponent } from './sign-up/sign-up-org/sign-up-org.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './_services';
import { SocialLinksComponent } from './social-links/social-links.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventFormComponent } from './event-form/event-form.component';
import { SignInAdminComponent } from './sign-in/sign-in-admin/sign-in-admin.component';
import { ContactComponent } from './contact/contact.component';

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
    ConfirmEqualValidatorDirective,
    HomeComponent,
    SocialLinksComponent,
    FooterComponent,
    NavbarComponent,
    EventFormComponent,
    SignInAdminComponent,
    ContactComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthenticationModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule {}
