import { Component } from '@angular/core';
import { CartDTO } from 'src/app/dtos/cartDTO';
import { CartItemDTO } from 'src/app/dtos/cartItemDTO';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent {

  cart: CartDTO | undefined;

  constructor(private service: CartService) { }

  ngOnInit(): void {
    this.service.getCart().subscribe(c => {
      this.cart = c;
    });
  }

  totalPrice(item: CartItemDTO): number {

    let result = item.itemPrice * item.quantity;
    let addon = item.cartItemAddons.map(x => x.addonPrice);
    if (addon.length > 0)
      return result + addon.reduce((pre = 0, curr) => pre + curr);

    return result;
  }

}
