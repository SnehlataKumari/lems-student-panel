import { Component, Input } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';

// Syntax to throw custom validation error
// const message = {
//   'telephoneNumber': {
//     'message': 'The phone number must be valid (XXX-XXX-XXX, where X is a digit)'
//   }
// };

@Component({
  selector: 'show-errors',
  template: `
   <ng-container *ngIf="shouldShowErrors()">
     <small class="text-danger" *ngFor="let error of listOfErrors()">{{error}}</small>
   </ng-container>
 `,
})
export class ShowErrorsComponent {

  private static readonly errorMessages = {
    'required': () => 'This field is required',
    'email': () => 'Enter valid email address',
    'minlength': (params) => 'The min number of characters is ' + params.requiredLength,
    'maxlength': (params) => 'The max allowed number of characters is ' + params.requiredLength,
    'pattern': (params) => null,
    'dateOfBirth': (params) => params.message,
    'location': (params) => params.message,
    'teachingExperience': (params) => params.message,
    'downloadSpeed': (params) => params.message,
    'uploadSpeed': (params) => params.message,
    'telephoneNumbers': (params) => params.message,
    'telephoneNumber': (params) => params.message
  };

  @Input()
  private control: AbstractControlDirective | AbstractControl;

  shouldShowErrors(): boolean {
    return this.control &&
      this.control.errors &&
      (this.control.dirty || this.control.touched);
  }

  listOfErrors(): string[] {
    return Object.keys(this.control.errors)
      .map(field => this.getMessage(field, this.control.errors[field]));
  }

  private getMessage(type: string, params: any) {
    return ShowErrorsComponent.errorMessages[type](params);
  }

}