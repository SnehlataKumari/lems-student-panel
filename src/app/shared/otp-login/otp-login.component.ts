import { Component, OnInit, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';
import { interval } from 'rxjs';

const emailOrMobile = /^(?:\d{10}|\w+@\w+\.\w{2,3})$/
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class OtpLoginComponent implements OnInit {

  message;
  loginForm: FormGroup;
  isOtpSent = false;
  showResendButton = false;

  minutes = '00';
  seconds = '00';

  constructor(
    private socialAuthService: SocialAuthService, 
    private authService: AuthService,
    private fb: FormBuilder,
    private alertService: AlertService,
    private router: Router,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      emailOrMobile: ['', [Validators.required, this.validateMobileEmail]],
      otp: ['']
    });

    this.loginForm.valueChanges.subscribe(() => {
      console.log(this.loginForm);
      
    })
  }

  validateMobileEmail(fc: AbstractControl) {

    const emailOrMobile = fc.value;
    /* Phone Test */
    const e = Validators.email(fc);
    if(!e) {
      return true;
    }

    if (emailOrMobile.length === 10 && !isNaN(parseInt(emailOrMobile, 10))) {
      return true;
    }

    if (!isNaN(parseInt(emailOrMobile, 10))) {
      return {
        emailOrMobile: 'Phone number must be of 10 digits.'
      }
    }

    if (e) {
      return {
        emailOrMobile: 'Enter valid email address',
      }
    }
   
    return {
      emailOrMobile: false,
    };
  }

  async resendOtp() {
    const formValue = this.loginForm.value;
    const response = await this.authService.sendOtp(formValue);
    this.alertService.success(`OTP sent to ${formValue.emailOrMobile}`);
    this.startTimer();
  }

  async sendOtp() {
    const formValue = this.loginForm.value;
    if (!this.isOtpSent) {
      try {
        const response = await this.authService.sendOtp(formValue);
        this.alertService.success(`OTP sent to ${formValue.emailOrMobile}`);
        this.isOtpSent = true;
        this.startTimer();

      } catch (error) {
        const errmsg = error.error.message;
        if (errmsg === 'User not registered!') {
          this.alertService.error('Your are not registered, Please signup first.');
          this.router.navigate(['signup'])
        }
      }
    } else {
      await this.authService.loginFromOtp(formValue);

    }
  }

  startTimer() {
    this.showResendButton = false;
    let timer = 60;
    let minutes;
    let seconds;

    const interSb = interval(1000).subscribe(x => {
      minutes = Math.floor(timer / 60);
      seconds = Math.floor(timer % 60);

      this.minutes = minutes < 10 ? "0" + minutes : minutes;
      this.seconds = seconds < 10 ? "0" + seconds : seconds;

      --timer;
      if (--timer < 0) {
        console.log('timeup');
        this.showResendButton = true;
        interSb.unsubscribe();
      }
    })
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
