import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { merge } from 'rxjs';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';


interface Gender {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  mobNumberPattern = "^((\\+91-?)|0)?[0-9]{10}$";

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private alertservice: AlertService
  ) { }

  get guardianFG() {
    return this.fb.group({
      guardianType: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      mobileNumber: ['', [Validators.required, Validators.pattern(this.mobNumberPattern)]],
      email: ['', [Validators.email, Validators.required]],
    }); 
  }

  form = this.fb.group({
    user: this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
    }),
    student: this.fb.group({
      preferedLanguage: ['', Validators.required],
      education: this.fb.group({
        board: ['', Validators.required],
        grade: ['', Validators.required],
        targetExam: ['', Validators.required],
        school: ['', Validators.required],
      }),
      isThisParentLogin: [false, Validators.required],

      guardians: this.fb.array([
        this.guardianFG
      ]),

      address: this.fb.group({
        streetAddress: ['', Validators.required],
        streetAddress2: [''],
        city: ['', Validators.required],
        state: ['', Validators.required],
        country: ['', Validators.required],
        pincode: ['', Validators.required],
      }),

      studentActivities: this.fb.group({
        interest: ['', Validators.required],
        pastPerformances: [''],
        schoolActivities: [''],
        strengths: [''],
      })
    }),
  })

  ngOnInit(): void {
    merge(this.authService.$student, this.authService.$user).subscribe(() => {
      const user = this.authService.$user.value;
      const student = this.authService.$student.value;
      this.populateValues(user, student);
    })
  }

  get guardians(): FormArray {
    return this.form.get('student').get('guardians') as FormArray;
  }

  populateValues(user, student) {
    
    if (student && student.guardians && student.guardians.length > 1) {
      for (let index = 1; index < student.guardians.length; index++) {
        // const element = student.guardians[index];
        this.guardians.push(this.guardianFG);
      }
    }
    this.form.patchValue({
      user,
      student
    });
  }

  onAddMoreGuardian() {
    this.guardians.push(this.guardianFG);
  }

  genders: Gender[] = [
    { value: 'MALE', viewValue: 'Male' },
    { value: 'FEMALE', viewValue: 'Female' },
  ];

  onSubmit() {
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.updateValueAndValidity();
      this.alertservice.error('Please fill required details.');
      return;
    }
    this.authService.updateStudentProfile(this.authService.$student.value['_id'], this.form.value);
  }

}
