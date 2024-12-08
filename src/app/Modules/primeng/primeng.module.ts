import { NgModule } from '@angular/core';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
const primeng = [
  DataViewModule,

  ButtonModule,
  PaginatorModule,
  TagModule,
]
@NgModule({

  declarations: [

  ],
  imports: [primeng],
  exports: [primeng, DataViewLayoutOptions]
})
export class PrimengModule { }
