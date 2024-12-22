import { Injectable } from '@angular/core';
import { ApiHandlerService } from './api-handler.service';
import { map, Observable } from 'rxjs';
import { CategoryDTO } from '../dtos/categoryDTO';
import { apiUrls } from '../config/api-urls';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiHandlerService) { }

  getAllCategory(): Observable<CategoryDTO[]> {
    return this.api
      .get(apiUrls.category.category)
      .pipe(map(x => x.data));
  }

}
