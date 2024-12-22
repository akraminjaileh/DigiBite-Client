import { Component } from '@angular/core';
import { ImageHandler } from 'src/app/config/imageHandler';
import { CartDTO } from 'src/app/dtos/cartDTO';
import { BehaviorService } from 'src/app/Services/behavior.service';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart-sidebar',
  templateUrl: './cart-sidebar.component.html',
  styleUrls: ['./cart-sidebar.component.css']
})
export class CartSidebarComponent {

  sidebarVisible: boolean = false;
  cart: CartDTO | undefined;

  constructor(
    private behavior: BehaviorService,
    private service: CartService,
  ) {
    this.behavior.getSidebarVisible()
      .subscribe(x => this.sidebarVisible = x);
  }

  ngOnInit(): void {
    this.service.getCart().subscribe(c => {
      this.cart = c;
    });
  }

  updateCart(cartItemId: number, qty: number) {
    this.service.updateQuantity({
      cartItemId: cartItemId,
      qty: qty
    }).subscribe(() => {
      this.ngOnInit();
    });
  }


  ngOnDestroy(): void {
    this.behavior.setSidebarVisible(false);

  }

  imageHandler(url: string | undefined) {
    return ImageHandler.url(url);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = ImageHandler.noImage;
  }

}
