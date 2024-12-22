import { NgModule } from '@angular/core';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { GalleriaModule } from 'primeng/galleria';
import { ChipModule } from 'primeng/chip';
import { AvatarModule } from 'primeng/avatar';
import { CheckboxModule } from 'primeng/checkbox';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { RippleModule } from 'primeng/ripple';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { SidebarModule } from 'primeng/sidebar';
import { RadioButtonModule } from 'primeng/radiobutton';

const primeng = [
  DataViewModule,
  ButtonModule,
  PaginatorModule,
  TagModule,
  DropdownModule,
  GalleriaModule,
  ChipModule,
  AvatarModule,
  CheckboxModule,
  DynamicDialogModule,
  RippleModule,
  InputTextareaModule,
  SidebarModule,
  RadioButtonModule


]
@NgModule({

  declarations: [

  ],
  imports: [primeng],
  exports: [primeng, DataViewLayoutOptions]
})
export class PrimengModule { }
