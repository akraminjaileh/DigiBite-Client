import { Component } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ImageHandler } from 'src/app/config/imageHandler';
import { AddToCartDTO } from 'src/app/dtos/addToCartDTO';
import { ItemDetailsDTO } from 'src/app/dtos/itemDetailsDTO';
import { BehaviorService } from 'src/app/Services/behavior.service';
import { CartService } from 'src/app/Services/cart.service';
import { ItemService } from 'src/app/Services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent {

  item: ItemDetailsDTO = {} as ItemDetailsDTO;
  addonIds: number[] = [];
  totalPrice: number = 0;
  addToCartDTO: AddToCartDTO | undefined;
  specialNotes: string = '';
  qty: number = 1;

  constructor(
    private itemService: ItemService,
    private cartService: CartService,
    public ref: DynamicDialogRef,
    public cofig: DynamicDialogConfig,
    private behavior: BehaviorService) { }

  ngOnInit(): void {
    this.itemService.getItem(this.cofig.data.id).subscribe(res => {
      this.item = res;
      this.totalPrice = this.item.price;
    });

  }

  addToCart() {
    this.addToCartDTO = {
      itemId: this.item.id || null,
      mealId: null,
      quantity: this.qty,
      specialNotes: this.specialNotes,
      cartItemAddonIDs: this.addonIds
    }
    this.cartService.addToCart(this.addToCartDTO)
      .subscribe(() => {
        this.ref.close();
        this.behavior.setSidebarVisible(true);
      })
  }

  calculateTotalPrice(): void {
    const addonPrice = this.item.addOnContainers
      ?.flatMap(container => container.addons)
      .filter(addon => this.addonIds.includes(addon.id))
      .reduce((sum, addon) => sum + addon.price, 0) || 0;
    this.totalPrice = Number((this.item.price + addonPrice).toFixed(2));
  }


  imageHandler(url: string | null): string {
    return ImageHandler.url(url);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = ImageHandler.noImage;
  }

}
