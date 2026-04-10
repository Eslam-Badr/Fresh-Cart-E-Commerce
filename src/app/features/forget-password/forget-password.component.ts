import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { AuthService } from '../../core/services/auth/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css',
})
export class ForgetPasswordComponent implements OnInit {

  private readonly authService = inject(AuthService)
  private readonly fb = inject(FormBuilder)
  private readonly router = inject(Router)

  stepNumber: WritableSignal<number> = signal(1)

  forgetPasswordForm!: FormGroup;

  verifyCodeForm!: FormGroup;

  resetPasswordForm!: FormGroup;


  ngOnInit(): void {
    this.initForms()
  }


  initForms() {
    this.forgetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    })

    this.verifyCodeForm = this.fb.group({
      resetCode: [null, [Validators.required]]
    })

    this.resetPasswordForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      newPassword: [null, [Validators.required]]
    })
  }


  forgetPassword() {
    this.authService.forgetPassword(this.forgetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);

        setTimeout(() => {
          this.stepNumber.set(2)
        }, 1000)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  verifyCode() {
    this.authService.verifyResetCode(this.verifyCodeForm.value).subscribe({
      next: (res) => {
        console.log(res);

        setTimeout(() => {
          this.stepNumber.set(3)
        }, 1000)

      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  resetPassword() {
    this.authService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (res) => {
        console.log(res);

        setTimeout(()=>{
          this.router.navigate(['/login'])
        }, 1000)
      },
      error: (err) => {
        console.log(err);
      }
    });
  }


}
