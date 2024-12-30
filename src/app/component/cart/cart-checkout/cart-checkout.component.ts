import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartDTO } from 'src/app/dtos/cartDTO';
import { CartItemDTO } from 'src/app/dtos/cartItemDTO';
import { PaymentMethodDTO } from 'src/app/dtos/paymentMethodDTO';
import { VoucherUserDTO } from 'src/app/dtos/voucherUserDTO';
import { CartService } from 'src/app/Services/cart.service';
import { CheckoutService } from 'src/app/Services/checkout.service';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.css']
})
export class CartCheckoutComponent {

  cart: CartDTO | undefined;
  voucher: VoucherUserDTO[] | undefined;
  paymentMethod: PaymentMethodDTO[] = [
    { name: 'Cash', icon: 'pi pi-money-bill', value: 'Cash' },
    { name: 'Visa,Master', icon: 'pi pi-credit-card', value: 'CreditCard' },
    { name: 'Wallet', icon: 'pi pi-wallet', value: 'Wallet' }
  ];
  paymentValue: string = 'Cash';
  note: string | undefined;
  isDisabled: boolean = false;
  label: string = 'Apply';

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router) { }

  ngOnInit(): void {
    this.cartService.getCart().subscribe(c => {
      this.cart = c;
      if (c.voucherId) {
        this.isDisabled = true;
        this.label = 'Remove';
      }
    });

    this.checkoutService.getUserVouchers().subscribe(res => {
      this.voucher = res;
    });

  }

  totalPrice(item: CartItemDTO): number {

    let result = item.itemPrice * item.quantity;
    let addon = item.cartItemAddons.map(x => x.addonPrice);
    if (addon.length > 0)
      return result + addon.reduce((pre = 0, curr) => pre + curr);

    return result;
  }

  applyVoucher(id: number) {
    if (!this.isDisabled)
      this.checkoutService.applyVoucher(id).subscribe(x => this.refreshComponent())
  }
  removeVoucher() {
    if (this.isDisabled)
      this.checkoutService.removeVoucher().subscribe(x => this.refreshComponent())
  }

  refreshComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/Fake-Url-For-Reload',
      {
        skipLocationChange: true

      }).then(() => {
        this.router.navigate([currentUrl]);
      });
  }

}
