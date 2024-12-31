import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ImageHandler } from 'src/app/config/imageHandler';
import { CartDTO } from 'src/app/dtos/cartDTO';
import { CartItemDTO } from 'src/app/dtos/cartItemDTO';
import { CheckoutDTO } from 'src/app/dtos/checkoutDTO';
import { PaymentMethodDTO } from 'src/app/dtos/paymentMethodDTO';
import { VoucherUserDTO } from 'src/app/dtos/voucherUserDTO';
import { BehaviorService } from 'src/app/Services/behavior.service';
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
  note: string | undefined = undefined;
  isDisabled: boolean = false;
  label: string = 'Apply';
  addressId: number | undefined;
  @Output() isCartEmpty = new EventEmitter<boolean>();

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService,
    private router: Router,
    private behavior: BehaviorService) { }

  ngOnInit(): void {

    this.cartService.getCart().subscribe({
      next: (c) => {
        this.cart = c;

        if (this.cart && this.cart?.voucherId) {
          this.isDisabled = true;
          this.label = 'Remove';
        }

        if (this.cart && this.cart?.cartItems?.length)
          this.isCartEmpty.emit(false);
        else this.isCartEmpty.emit(true);
      }


    });

    this.checkoutService.getUserVouchers().subscribe(res => {
      this.voucher = res;
    });

    this.behavior.getAddressId().subscribe(i => this.addressId = i);

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

  checkout() {
    let input: CheckoutDTO = {
      customerNotes: this.note,
      paymentMethod: this.paymentValue,
      userAddressId: this.addressId
    };
    console.log(input)
    this.checkoutService.checkout(input)
      .subscribe(id => {
        this.behavior.setOrderId(id);
        this.router.navigate(['checkout/thank-you']);
      });
  }

  imageHandler(url: string | undefined) {
    return ImageHandler.url(url);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = ImageHandler.noImage;
  }

}
