import Swal from "sweetalert2";
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators, } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationErrorsService } from '../../services/validation/validation-errors.service';
import { AuthService } from '../../services/auth/auth.service';
import 'sweetalert2/src/sweetalert2.scss'



@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  private readonly fb = inject(FormBuilder)
  private readonly validationsService = inject(ValidationErrorsService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);



  registerForm !: FormGroup;

  ngOnInit(): void {
    this.registerFormInit()

  }


  registerFormInit() {
    this.registerForm = this.fb.group(
      {
        name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.pattern(/^(?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{8,}$/)]],
        rePassword: [null, Validators.required],
        phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      }, { validators: this.confirmPassword })
  }


  register() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
        complete: () => {

          this.succesMsg();
          setTimeout(() => {
            this.router.navigate(['/login'])
          }, 1000)
        }
      });

    } else {
      this.registerForm.markAllAsTouched();
    }
  }


  getError(name: string) {
    return this.validationsService.getError(this.registerForm, name);
  }


  confirmPassword(group: AbstractControl) {
    // password
    const passwordValue = group.get('password')?.value;
    // repassword
    const rePasswordControl = group.get('rePassword');


    const rePasswordValue = rePasswordControl?.value;

    // validation error
    const currentErrors = rePasswordControl?.errors;

    if (passwordValue === rePasswordValue) {
      if (currentErrors) {
        const { mismatch, ...rest } = currentErrors;
        rePasswordControl?.setErrors(Object.keys(rest).length ? rest : null);
      }
      return null;
    } else {
      if (!rePasswordValue) return null;

      rePasswordControl?.setErrors({ ...currentErrors, mismatch: true });
      return { mismatch: true };
    }
  }


  // password icon visibility
  showPassword: WritableSignal<boolean> = signal(false);

  visiblePassword() {
    this.showPassword.update(v => !v)
  }



  // swal massege
  succesMsg() {
    Swal.fire({
      title: `Account Created!
      Now you can Log in`,
      icon: "success",
      draggable: true
    });
  }

  errorMsg(message:string) {
    Swal.fire({
      title: `${message}`,
      icon: "error",
      draggable: false
    });
  }


}
