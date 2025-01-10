import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';
import { SendConfirmationEmailComponent } from '../send-confirmation-email/send-confirmation-email.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;

  hide: boolean = true;
  constructor(private fb: FormBuilder,
    private service: AuthService,
    private toaster: ToastrService,
    private dialog: MatDialog) {

    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.pattern('^[A-Za-z]{2,20}$')]],
      lastName: [undefined, Validators.pattern('^[A-Za-z]{1,20}$')],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^07[7-9]{1}[0-9]{7}$')]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$')]]
    })

  }
  sendConfirmationEmailFromSignup() {
    this.dialog.open(SendConfirmationEmailComponent, {
      width: '400px',
      height: 'auto',
      data: { email: this.signupForm.value.email }
    })
  }
  onSubmit() {
    if (this.signupForm.invalid) return
    this.service.signup(this.signupForm.value).subscribe(
      res => {
        this.toaster.success(res);
        this.sendConfirmationEmailFromSignup();
      })
  }


}
