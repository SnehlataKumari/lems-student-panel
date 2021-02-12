import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isOtpSent = false;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService, 
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    
    this.loginForm = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  async onSubmit() {
    await this.authService.studentLogin(this.loginForm.value);
  }

  googleLogin() {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialAuthService.authState.subscribe(authState => {
      this.authService.socialLogin({
        email: authState.email,
        socialLoginType: 'GOOGLE',
        socialLoginId: authState.id
      });
    });
  }

}
