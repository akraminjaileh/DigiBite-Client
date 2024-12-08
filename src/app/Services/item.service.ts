import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { ItemsDTO } from '../dtos/itemsDTO';
import { map, Observable } from 'rxjs';
import { apiUrls } from '../config/api-urls';
import { PaginatedResult } from '../config/paginatedResult';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private api: ApiHandlerService) { }

  getAllItem(skip: number, take: number): Observable<PaginatedResult<ItemsDTO>> {
    const params = { skip: skip.toString(), take: take.toString() };
    return this.api
      .get(apiUrls.item.item, params)
      .pipe(map(x => x.data));
  }


}
