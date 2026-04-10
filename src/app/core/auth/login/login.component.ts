import { AuthService } from './../../services/auth/auth.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ɵInternalFormsSharedModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ValidationErrorsService } from '../../services/validation/validation-errors.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [RouterLink, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {

  private readonly fb = inject(FormBuilder)
  private readonly validationsService = inject(ValidationErrorsService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  signinForm !: FormGroup;


  ngOnInit(): void {
    this.signinFormInit()
  }




  signinFormInit() {
    this.signinForm = this.fb.group(
      {
        email: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required]]
      })
  }


  signIn() {
    this.authService.login(this.signinForm.value).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token)
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.errorMsg(err.error.message)
      },
      complete: () => {
        this.succesMsg();
        setTimeout(() => {
          this.router.navigate(['/home'])
        }, 1000)
      }
    });
  }


  getError(name: string) {
    return this.validationsService.getError(this.signinForm, name);
  }


  showPassword: WritableSignal<boolean> = signal(false);

  visiblePassword() {
    this.showPassword.update(v => !v)
  }







  succesMsg() {
    Swal.fire({
      title: `Congratulations !
        You have logged in`,
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
