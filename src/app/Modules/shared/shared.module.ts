import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FooterComponent } from './footer/footer.component';
import { NavComponent } from './nav/nav.component';



@NgModule({
  declarations: [
    AlertComponent,
    ConfirmDialogComponent,
    FooterComponent,
    NavComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
