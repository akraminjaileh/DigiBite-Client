import { Component } from '@angular/core';
import { BehaviorService } from 'src/app/Services/behavior.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  isCartEmpty: boolean = false;

  cartEvent(event: boolean) {
    this.isCartEmpty = event;
    console.log(this.isCartEmpty, event)
  }
}
