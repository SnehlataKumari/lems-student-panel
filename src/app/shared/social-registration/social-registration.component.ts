import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { FacebookLoginProvider, SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { passwordMatchValidator } from 'src/app/utils';
import { ActivatedRoute } from '@angular/router';
import { typeWithParameters } from '@angular/compiler/src/render3/util';


declare var $: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class SocialRegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;

  constructor(
    private authService: AuthService,
    private socialAuthService: SocialAuthService,
    private fb: FormBuilder,
    
  ) { }

  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  ngOnInit() {

    this.userRegistrationForm = this.fb.group({
        firstName: ['', Validators.required],
        lastName: [''],
        email: ['', [Validators.required, Validators.email]],
        phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
        grade: ['', Validators.required],
        // socialLoginType: ['', Validators.required],
        // socialLoginId: ['', Validators.required],
    });

    this.socialAuthService.authState.subscribe((authState) => {
      if(authState.provider === 'GOOGLE') {
        this.userRegistrationForm.patchValue({...authState, socialLoginId: authState.id, socialLoginType: 'GOOGLE'});
      }
    });

    this.authService.$signupForm.subscribe(values => {
      this.userRegistrationForm.patchValue(values);
    });
  }

  onSubmit() {
    const formValue = this.userRegistrationForm.value;
    this.authService.userSocialSignUp(formValue);
  }

  onLoginWithFaceBook() {
   
    this.authService.signInWithFB();
  }

}
