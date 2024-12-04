import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';


const material = [
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatGridListModule,
  MatListModule
]
@NgModule({
  imports: [material],
  exports: [material]
})
export class MaterialModule { }
