import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ImageHandler } from 'src/app/config/imageHandler';
import { OrderDetailsDTO } from 'src/app/dtos/orderDetailsDTO';
import { BehaviorService } from 'src/app/Services/behavior.service';
import { CheckoutService } from 'src/app/Services/checkout.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent {

  private subscription: Subscription = new Subscription;

  orderDetails: OrderDetailsDTO | undefined;

  constructor(
    private service: CheckoutService,
    private behavior: BehaviorService,
    private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(
      this.behavior.getOrderId().subscribe(id => {
        if (id)
          this.service.thankYou(id).subscribe(res => this.orderDetails = res);
        else this.router.navigate(['./error'])
      }));
  }


  imageHandler(url: string | undefined) {
    return ImageHandler.url(url);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = ImageHandler.noImage;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
