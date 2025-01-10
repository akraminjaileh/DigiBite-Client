import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { SendConfirmationEmailComponent } from '../send-confirmation-email/send-confirmation-email.component';
import { Location } from '@angular/common';

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
    , private router: Router
    , private route: ActivatedRoute
    , private location: Location
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
        localStorage.setItem("token", res.token);
        localStorage.setItem("customerName", res.customerName);
        localStorage.setItem("expires", res.expires.toString());

        this.location.back()

        this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd) {
            if (this.router.url.includes('auth')) {
              this.router.navigate(['/']);
            }
          }
        });

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
