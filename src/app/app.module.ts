import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AgmCoreModule } from '@agm/core';
import { StarRatingModule } from 'angular-star-rating';



import { AdministratorGuard } from './_guards/administrator.guard';
import { OrganizationGuard } from './_guards/organization.guard';
import { VoluntaryGuard } from './_guards/voluntary.guard';

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
import { SignInComponent } from './shared/sign-in/sign-in.component';
import { SignInUserComponent } from './shared/sign-in/sign-in-user/sign-in-user.component';
import { SignUpComponent } from './shared/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { UserService, GenderService } from './_services';
import { SocialLinksComponent } from './shared/social-links/social-links.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { EventFormComponent } from './events/event-form/event-form.component';
import { SignInAdminComponent } from './shared/sign-in/sign-in-admin/sign-in-admin.component';
import { ContactComponent } from './contact/contact.component';
import { EventService } from './_services/event.service';
import { CompleteFormComponent } from './shared/sign-up/complete-form/complete-form.component';
import { SignUpVolunteerComponent } from './shared/sign-up/complete-form/sign-up-volunteer/sign-up-volunteer.component';
import { SignUpOrganizationComponent } from './shared/sign-up/complete-form/sign-up-organization/sign-up-organization.component';
import { ContactService } from './_services/contact.service';
import { OrganizationHomeComponent } from './home/organization-home/organization-home.component';
import { VolunteerHomeComponent } from './home/volunteer-home/volunteer-home.component';
import { AdministratorHomeComponent } from './home/administrator-home/administrator-home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { VoluntaryProfileComponent } from './profile/voluntary-profile/voluntary-profile.component';
import { FileUploadService } from './_services/file-upload.service';
import { NgUploaderModule } from 'ngx-uploader';
import { MunicipalityService } from './_services/municipality.service';
import { CategoryService } from './_services/category.service';
import { EventDetailComponent } from './events/event-detail/event-detail.component';
import { InterestService } from './_services/interest.service';
import { UncompletedGuard } from './_guards/uncompleted.guard';

import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { AmazingTimePickerModule } from 'amazing-time-picker'; // this line you need
import { ChartsModule } from 'ng2-charts';
import { PdfViewerModule } from 'ng2-pdf-viewer';


// the second parameter 'fr' is optional
registerLocaleData(localeEs, 'es');


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    SignInComponent,
    SignInUserComponent,
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
    VoluntaryProfileComponent,
    EventDetailComponent
  ],
  imports: [
    NgbModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationModule,
    HttpClientModule,
    SweetAlert2Module.forRoot(),
    SocialLoginModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBODCemGB-zpXz27GtynA1i2SCfU-BdQlE'
    }),
    NgUploaderModule,
    InfiniteScrollModule,
    StarRatingModule.forRoot(),
    AmazingTimePickerModule,
    ChartsModule,
    PdfViewerModule

  ],
  providers: [
    UserService,
    EventService,
    ContactService,
    FileUploadService,
    MunicipalityService,
    CategoryService,
    GenderService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    AdministratorGuard,
    VoluntaryGuard,
    OrganizationGuard,
    InterestService,
    UncompletedGuard,
    { provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
