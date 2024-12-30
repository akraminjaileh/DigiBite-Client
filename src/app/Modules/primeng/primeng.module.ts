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
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { DividerModule } from 'primeng/divider';

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
  RadioButtonModule,
  OverlayPanelModule,
  DividerModule


]
@NgModule({

  declarations: [

  ],
  imports: [primeng],
  exports: [primeng, DataViewLayoutOptions]
})
export class PrimengModule { }
