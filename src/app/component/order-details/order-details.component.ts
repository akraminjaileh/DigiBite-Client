import { Component, Input, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { ImageHandler } from 'src/app/config/imageHandler';
import { OrderDetailsDTO } from 'src/app/dtos/orderDetailsDTO';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent {

  private subscription: Subscription = new Subscription;

  @Input() orderId: number | undefined;
  @Input() homeBtn: boolean = false;

  orderDetails: OrderDetailsDTO | undefined;

  constructor(
    private service: AccountService,
    private router: Router,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public cofig: DynamicDialogConfig) { }

  ngOnInit(): void {

    if (this.cofig?.data)
      this.orderId = this.cofig.data.id;

    if (this.orderId)
      this.subscription.add(
        this.service.orderDetails(this.orderId)
          .subscribe(res => this.orderDetails = res));
    else {
      if (this.ref)
        this.ref.close();
      this.router.navigate(['/error']);
    }

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
