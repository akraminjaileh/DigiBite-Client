import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MaterialModule } from '../material/material.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
import { SendConfirmationEmailComponent } from './send-confirmation-email/send-confirmation-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component'

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    RestPasswordComponent,
    ForgetPasswordComponent,
    SendConfirmationEmailComponent,
    ConfirmEmailComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    HttpClientModule,
    TranslateModule.forChild({
      extend: true
    }),
    MatDialogModule,
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
