import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IResetPassDTO } from 'src/app/dtos/iResetPassDTO';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-rest-password',
  templateUrl: './rest-password.component.html',
  styleUrls: ['./rest-password.component.css']
})
export class RestPasswordComponent {

  resetPassForm: FormGroup;
  hide: boolean = true;
  email: string = '';
  token: string = '';

  constructor(private fb: FormBuilder
    , private service: AuthService
    , private router: Router
    , private route: ActivatedRoute
    , private toaster: ToastrService) {

    this.resetPassForm = this.fb.group(
      {
        password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$')]],
        confirmPassword: ['', [Validators.required]],
      },
      { validators: this.passwordMatchValidator() }
    )

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.email = p['email'],
        this.token = p['token']
    })

  }

  onSubmit() {
    if (this.resetPassForm.invalid) return

    let dto: IResetPassDTO = {
      email: this.email,
      token: this.token,
      password: this.resetPassForm.value.password
    }

    this.service.resetPass(dto).subscribe(
      res => {

        this.toaster.success(res);
        this.router.navigateByUrl("/auth");
      })

  }

  passwordMatchValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password');
      const confirmPassword = control.get('confirmPassword');

      if (!password || !confirmPassword) return null;

      const isMismatch = password.value !== confirmPassword.value;

      if (isMismatch) {
        confirmPassword.setErrors({ passwordMismatch: true });
      } else {
        const errors = confirmPassword.errors;
        if (errors) {
          delete errors['passwordMismatch'];
          if (!Object.keys(errors).length) {
            confirmPassword.setErrors(null);
          }
        }
      }

      return null;
    };
  }


}

