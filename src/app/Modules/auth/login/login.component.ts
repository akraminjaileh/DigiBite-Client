import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { SendConfirmationEmailComponent } from '../send-confirmation-email/send-confirmation-email.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent {
  loginForm: FormGroup;

  hide: boolean = true;

  constructor(private fb: FormBuilder
    , private service: AuthService
    , private route: Router
    , private dialog: MatDialog) {

    this.loginForm = this.fb.group({
      userName: ['customer@example.com', [Validators.required, Validators.email]],
      password: ['Test@1234', [Validators.required]]
    })

  }

  onSubmit() {
    if (this.loginForm.invalid) return
    this.service.login(this.loginForm.value).subscribe({
      next: (res) => {
        localStorage.setItem("token", res);
        this.route.navigateByUrl("");
      },
      error: (err) => {
        if (err.error.errorMsg == "Login is not allowed. Please confirm your email")
          this.sendConfirmationEmailFromLogin();
      }
    })
  }


  openDialog() {
    this.dialog.open(ForgetPasswordComponent, {
      width: '400px',
      height: 'auto'
    })
  }

  public sendConfirmationEmailFromLogin() {
    this.dialog.open(SendConfirmationEmailComponent, {
      width: '400px',
      height: 'auto',
      data: { email: this.loginForm.value.userName }
    })
  }

}
