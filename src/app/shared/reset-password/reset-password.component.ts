import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
declare var $: any;
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  token;
  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService
  ) { }

  // TODO: Form is invalid if both password not matches
  resetPasswordForm = this.fb.group({
    currentPassword: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, { validator: this.checkPasswords });

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.token = paramMap.get('token');
    });
  }

  onSubmit() {
    const formData = this.resetPasswordForm.value;
    if (!this.token) {
      this.alertService.error('Can\'t find token!');
      return;
    }
    this.authService.resetStudentPassword({ ...formData, token: this.token });
    $('#change-password').modal('hide');
  }

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
    let pass = group.get('currentPassword').value;
    let confirmPass = group.get('confirmPassword').value;
    return pass === confirmPass ? null : { notSame: true }
  }
}

