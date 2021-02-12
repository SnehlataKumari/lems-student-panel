import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegistrationComponent } from './registration/registration.component';
import { SocialRegistrationComponent } from './social-registration/social-registration.component';
import { OtpLoginComponent } from './otp-login/otp-login.component';

const routes: Routes = [
  { path: '', redirectTo:"/otp-login", pathMatch:'full'},
  { path: 'login',component: LoginComponent},
  { path: 'otp-login',component: OtpLoginComponent},
  { path: 'forgot-password',component: ForgotPasswordComponent},
  { path: 'reset-password/:token',component: ResetPasswordComponent},
  { path: 'signup',component: RegistrationComponent},
  { path: 'social-signup',component: SocialRegistrationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule] 
})
export class SharedRoutingModule { }
