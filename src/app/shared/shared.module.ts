import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatModuleModule } from '../mat-module.module';
import { SharedRoutingModule } from './shared-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { AppPasswordDirective } from './directives/app-password.directive';
import { CustomPasswordComponent } from './components/custom-password/custom-password.component';
import { SocialRegistrationComponent } from './social-registration/social-registration.component';
import { OtpLoginComponent } from './otp-login/otp-login.component';
import { ShowErrorsComponent } from './components/show-errors/show-errors.component';

@NgModule({
  declarations: [
    SocialRegistrationComponent,
    LoginComponent,
    OtpLoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent, RegistrationComponent, AppPasswordDirective, CustomPasswordComponent,
    ShowErrorsComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatModuleModule,
  ],
  exports: [
    CustomPasswordComponent,
    ShowErrorsComponent
  ]
})
export class SharedModule { }
