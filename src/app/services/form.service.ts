import { Injectable } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormService {
  constructor() {}

  validatorRequiredMin(minLen): any[] {
    return [Validators.required, Validators.minLength(minLen)];
  }

  validatorRequiredEmail(): any[] {
    return [Validators.required, Validators.email];
  }

  validatorRequiredPassword(): any[] {
    return [Validators.required, Validators.minLength(8)];
  }

  validatorPasswordMatch(
    controlName: string,
    matchingControlName: string
  ): any {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (
        matchingControl.errors &&
        !matchingControl.errors.confirmedValidator
      ) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmedValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }
}
