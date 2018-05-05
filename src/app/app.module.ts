import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgmCoreModule } from '@agm/core';


import { AdministratorGuard} from './_guards/administrator.guard';
import { OrganizationGuard} from './_guards/organization.guard';
import { VoluntaryGuard} from './_guards/voluntary.guard';

import { ConfirmEqualValidatorDirective } from './_validators/confirm-equal-validator.directive';

import { AuthenticationModule } from './_services/authentication/authentication.module';

import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angular5-social-login';

import { getAuthServiceConfigs } from './_config/social-login.config';

import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignInUserComponent } from './sign-in/sign-in-user/sign-in-user.component';
import { SignInOrgComponent } from './sign-in/sign-in-org/sign-in-org.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { UserService } from './_services';
import { SocialLinksComponent } from './social-links/social-links.component';
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { EventFormComponent } from './event-form/event-form.component';
import { SignInAdminComponent } from './sign-in/sign-in-admin/sign-in-admin.component';
import { ContactComponent } from './contact/contact.component';
import { EventService } from './_services/event.service';
import { CompleteFormComponent } from './sign-up/complete-form/complete-form.component';
import { SignUpVolunteerComponent } from './sign-up/complete-form/sign-up-volunteer/sign-up-volunteer.component';
import { SignUpOrganizationComponent } from './sign-up/complete-form/sign-up-organization/sign-up-organization.component';
import { ContactService } from './_services/contact.service';
import { OrganizationHomeComponent } from './home/organization-home/organization-home.component';
import { VolunteerHomeComponent } from './home/volunteer-home/volunteer-home.component';
import { AdministratorHomeComponent } from './home/administrator-home/administrator-home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VoluntaryProfileComponent } from './profile/voluntary-profile/voluntary-profile.component';
import { FileUploadService } from './_services/file-upload.service';
import { NgUploaderModule } from 'ngx-uploader';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignInComponent,
    SignInUserComponent,
    SignInOrgComponent,
    SignUpComponent,
    ConfirmEqualValidatorDirective,
    HomeComponent,
    SocialLinksComponent,
    FooterComponent,
    NavbarComponent,
    EventFormComponent,
    SignInAdminComponent,
    ContactComponent,
    CompleteFormComponent,
    SignUpVolunteerComponent,
    SignUpOrganizationComponent,
    OrganizationHomeComponent,
    VolunteerHomeComponent,
    AdministratorHomeComponent,
    NotFoundComponent,
    VoluntaryProfileComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AuthenticationModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBODCemGB-zpXz27GtynA1i2SCfU-BdQlE'
    }),
    NgUploaderModule
  ],
  providers: [
    UserService,
    EventService,
    ContactService,
    FileUploadService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AdministratorGuard,
    VoluntaryGuard,
    OrganizationGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
