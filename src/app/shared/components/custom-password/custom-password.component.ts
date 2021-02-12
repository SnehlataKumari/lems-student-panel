
import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-custom-password',
  templateUrl: './custom-password.component.html',
  styleUrls: ['./custom-password.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CustomPasswordComponent),
    multi: true
  }]
})
export class CustomPasswordComponent implements OnInit, ControlValueAccessor {

  @Input() label="password";
  @Input() id;
  @Input() disabled = false;
  @Input() placeholder = 'Enter Password';

  showPassword = false;


  // Internal properties
  value;
  onChange = (_ => { });
  onBlur = (_ => { });

  writeValue(obj: boolean): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onBlur = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onChanged($event) {
    this.value = $event && $event.target && $event.target.value;
    this.onChange(this.value);
  }
  ngOnInit(): void {
  }

  togglePassField() {
    this.showPassword = !this.showPassword;
  }

}

