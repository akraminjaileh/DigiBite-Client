import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { ItemsDTO } from '../dtos/itemsDTO';
import { map, Observable } from 'rxjs';
import { apiUrls } from '../config/api-urls';
import { PaginatedResult } from '../config/paginatedResult';
import { ItemDetailsDTO } from '../dtos/itemDetailsDTO';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  constructor(private api: ApiHandlerService) { }

  getAllItem(params: { [key: string]: any }): Observable<PaginatedResult<ItemsDTO>> {
    return this.api
      .get(apiUrls.item.item, params)
      .pipe(map(x => x.data));
  }

  getItem(id: number | undefined): Observable<ItemDetailsDTO> {
    return this.api
      .get(`${apiUrls.item.item}/${id}`, undefined)
      .pipe(
        map(x => {
          if (x) return x.data
        })
      );
  }

}
