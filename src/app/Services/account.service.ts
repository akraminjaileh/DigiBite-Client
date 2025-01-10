import { Injectable } from '@angular/core';
import { UserProfileDTO } from '../dtos/userProfileDTO';
import { map, Observable } from 'rxjs';
import { apiUrls } from '../config/api-urls';
import { ApiHandlerService } from './api-handler.service';
import { UpdateProfileDTO } from '../dtos/updateProfileDTO';
import { HttpHeaders, HttpRequest } from '@angular/common/http';
import { OrderDetailsDTO } from '../dtos/orderDetailsDTO';
import { OrdersByDateDTO } from '../dtos/ordersByDateDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private api: ApiHandlerService) { }

  getProfile(): Observable<UserProfileDTO> {
    return this.api
      .get(apiUrls.account.getProfile, undefined)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

  updateProfile(input: UpdateProfileDTO): Observable<any> {
    return this.api.patch(apiUrls.account.updateProfile, input);
  }


  updateProfileImage(file: File): Observable<any> {

    const formData = new FormData();
    formData.append('file', file);
    return this.api.patch(apiUrls.account.updateProfileImage, formData);
  }

  orderDetails(orderId: number): Observable<OrderDetailsDTO> {
    return this.api
      .get(`${apiUrls.CustomerAction.order}/${orderId}`)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

  orders(): Observable<OrdersByDateDTO[]> {
    return this.api
      .get(apiUrls.CustomerAction.order, undefined)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

}
