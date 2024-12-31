import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { AddToCartDTO } from '../dtos/addToCartDTO';
import { map, Observable } from 'rxjs';
import { apiUrls } from '../config/api-urls';
import { CartDTO } from '../dtos/cartDTO';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private api: ApiHandlerService) { }

  getCart(): Observable<CartDTO> {
    return this.api
      .get(apiUrls.CustomerAction.getCart, undefined)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

  addToCart(input: AddToCartDTO): Observable<any> {
    return this.api.post(apiUrls.CustomerAction.addToCart, input);
  }

  updateQuantity(input: {
    cartItemId: number,
    qty: number
  }): Observable<any> {
    return this.api.post(apiUrls.CustomerAction.updateQuantity, input);
  }

}
