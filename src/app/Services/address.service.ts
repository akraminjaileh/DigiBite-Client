import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { map, Observable } from 'rxjs';
import { AddressDTO } from '../dtos/addressDTO';
import { apiUrls } from '../config/api-urls';
import { AddressesDTO } from '../dtos/addressesDTO';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private api: ApiHandlerService) { }

  getAddresses(): Observable<AddressesDTO[]> {
    return this.api
      .get(apiUrls.CustomerAction.address, undefined)
      .pipe(map(x => x.data));
  }

  getAddressById(id: number): Observable<AddressDTO> {
    return this.api
      .get(`${apiUrls.CustomerAction.address}/${id}`, undefined)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

  getDefaultAddress(): Observable<AddressDTO> {
    return this.api
      .get(apiUrls.CustomerAction.defaultAddress, undefined)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

  createAddress(input: any): Observable<any> {
    return this.api.post(apiUrls.CustomerAction.address, input);
  }

  updateAddress(input: AddressDTO, id: number): Observable<any> {
    return this.api.put(apiUrls.CustomerAction.address, id, input);
  }

  removeAddress(id: number): Observable<any> {
    return this.api.delete(apiUrls.CustomerAction.address, id);
  }

}
