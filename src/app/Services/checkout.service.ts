import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { map, Observable } from 'rxjs';
import { VoucherUserDTO } from '../dtos/voucherUserDTO';
import { apiUrls } from '../config/api-urls';
import { CheckoutDTO } from '../dtos/checkoutDTO';
import { OrderDetailsDTO } from '../dtos/orderDetailsDTO';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private api: ApiHandlerService) { }

  getUserVouchers(): Observable<VoucherUserDTO[]> {
    return this.api
      .get(apiUrls.CustomerAction.voucher, undefined)
      .pipe(map(x => x.data));
  }

  applyVoucher(id: number): Observable<any> {
    return this.api
      .put(apiUrls.CustomerAction.voucher, id, undefined)
      .pipe(map(x => x.data));
  }

  removeVoucher(): Observable<any> {
    return this.api
      .delete(apiUrls.CustomerAction.voucher, undefined)
      .pipe(map(x => x.data));
  }

  checkout(input: CheckoutDTO): Observable<number> {
    return this.api
      .post(apiUrls.CustomerAction.orderCheckout, input)
      .pipe(map(x => x.data));
  }

  thankYou(orderId: number): Observable<OrderDetailsDTO> {
    return this.api
      .get(`${apiUrls.CustomerAction.order}/${orderId}`)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

}
