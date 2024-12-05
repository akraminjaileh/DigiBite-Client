import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { ItemsDTO } from '../dtos/itemsDTO';
import { map, Observable } from 'rxjs';
import { apiUrls } from '../config/api-urls';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private api: ApiHandlerService) { }

  getAllItem(): Observable<ItemsDTO[]> {
    return this.api
      .get(apiUrls.item.item, undefined)
      .pipe(map(x => x.data));
  }


}
