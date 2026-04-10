import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ValidationErrorsService {

  validationMessages: any = {
    name: {
      required: 'Name is required',
      minlength: 'Name must be at least 3 characters',
      maxlength: 'Name cannot exceed 20 characters'
    },
    email: {
      required: 'Email is required',
      email: 'Please enter a valid email'
    },
    phone: {
      required: 'Phone number is required',
      pattern: 'Enter valid Egyptian phone number'
    },
    password: {
      required: 'Password is required',
      pattern: 'Password must include uppercase, lowercase, and symbol'
    },
    rePassword: {
      required: 'Please confirm your password',
      mismatch: 'Passwords do not match'
    },
  };

  getError(form: any, controlName: string) {
    const control = form.get(controlName);

    if (!control || !control.errors || !control.touched) return null;

    const firstError = Object.keys(control.errors)[0];
    return this.validationMessages[controlName][firstError];
  }
}
