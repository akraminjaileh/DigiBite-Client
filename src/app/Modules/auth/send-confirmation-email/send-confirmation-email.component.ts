import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { interval, Subscription, take } from 'rxjs';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-send-confirmation-email',
  templateUrl: './send-confirmation-email.component.html',
  styleUrls: ['./send-confirmation-email.component.css']
})
export class SendConfirmationEmailComponent {

  email: FormControl;
  countdown = 10;
  isButtonDisabled = true;
  private countdownSubscription!: Subscription;

  constructor(
    private service: AuthService,
    @Inject(MAT_DIALOG_DATA) private data: { email: string }
  ) {
    this.email = new FormControl(data.email)

  }

  ngOnInit(): void {
    this.sendConfirmationEmail(this.email.value);
    this.startCountdown();
  }

  sendConfirmationEmail(email: string) {
    this.startCountdown();
    this.service.sendConfirmationEmail(email).subscribe();
  }

  startCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdown = 10;
    this.isButtonDisabled = true;
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))
      .subscribe({
        next: () => this.countdown--,
        complete: () => {
          this.isButtonDisabled = false;
        }
      });
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }

}

