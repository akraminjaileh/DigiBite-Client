import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { interval, Subscription, take } from 'rxjs';
import { ConfirmEmailDTO } from 'src/app/dtos/confirmEmailDTO';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
})
export class ConfirmEmailComponent {

  countdown = 20;
  private countdownSubscription!: Subscription;
  private confirmDTO: ConfirmEmailDTO;

  constructor(
    private router: Router,
    private service: AuthService,
    private route: ActivatedRoute) {
    this.confirmDTO = new ConfirmEmailDTO();
  }

  ngOnInit(): void {

    this.route.queryParams.subscribe({
      next: (p) => {
        this.confirmDTO.userId = p['userId'];
        this.confirmDTO.token = p['token'];
        this.service.confirmEmail(this.confirmDTO)
          .subscribe({
            next: () => this.startCountdown(),
            error: () => this.router.navigate(['/error'])
          });
      },
      error: () => {
        this.router.navigate(['/error'])
      }
    });
  }

  startCountdown(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }

    this.countdown = 20;
    this.countdownSubscription = interval(1000)
      .pipe(take(this.countdown))
      .subscribe({
        next: () => this.countdown--,
        complete: () => {
          this.router.navigate(["/auth"])
        }
      });
  }

  ngOnDestroy(): void {
    if (this.countdownSubscription) {
      this.countdownSubscription.unsubscribe();
    }
  }
}
