import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  forgotForm = this.fb.group({
    email: ['', Validators.required],
  });

  onSubmit() {
    const formData = this.forgotForm.value;
    this.authService.forgotStudentPassword(formData);
  }

}