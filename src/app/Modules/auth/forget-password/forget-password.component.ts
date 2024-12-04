import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  email: FormControl;

  constructor(
    private service: AuthService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<ForgetPasswordComponent>) {
    this.email = new FormControl('', [Validators.email, Validators.required]);
  }

  onSubmit() {
    if (this.email.invalid) return
    this.service.forgetPass({ email: this.email.value })
      .subscribe(res => {
        this.toastr.success(res);
        this.dialogRef.close()
      })
  }

}
