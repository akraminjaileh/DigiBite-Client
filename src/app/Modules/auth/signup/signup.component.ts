import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiResponse } from 'src/app/dtos/ApiResponse';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  hide: boolean = true;
  constructor(private fb: FormBuilder, private service: AuthService) {

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]{2,20}$')]],
      lastName: ['', Validators.pattern('^[A-Za-z]{1,20}$')],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^07[0-9]{8}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,}$')]]
    })

  }
  onSubmit() {
    if (this.signupForm.invalid) return
    this.service.signup(this.signupForm.value).subscribe();

  }


}
