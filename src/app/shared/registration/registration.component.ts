import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, Form } from '@angular/forms';
import { FacebookLoginProvider } from 'angularx-social-login';
import { AuthService } from 'src/app/services/auth.service';
import { FormService } from 'src/app/services/form.service';
import { passwordMatchValidator } from 'src/app/utils';


declare var $: any;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  userRegistrationForm: FormGroup;
  

  constructor(
    private authService: AuthService,
    private formService: FormService,
    private fb: FormBuilder,
    
  ) { }

  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";
  ngOnInit() {

    this.userRegistrationForm = this.fb.group({
        firstName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
        phone: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
        grade: ['', Validators.required]
    }, {
        validators: passwordMatchValidator('password', 'confirmPassword')
    });
  }

  onSubmit() {
    const formValue = this.userRegistrationForm.value;
    this.authService.userSignUp(formValue);
  }

  onLoginWithFaceBook() {
   
    this.authService.signInWithFB();
  }

}
