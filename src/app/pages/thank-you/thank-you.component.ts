import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { BehaviorService } from 'src/app/Services/behavior.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent {

  private subscription: Subscription = new Subscription;

  orderID: number | undefined;

  constructor(private behavior: BehaviorService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.behavior.getOrderId().subscribe(id => this.orderID = id));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
