import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { MainComponent } from './pages/main/main.component';
import { ItemComponent } from './component/item/item.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { OrderComponent } from './pages/order/order.component';
import { CategoryComponent } from './component/category/category.component';
import { SharedModule } from './Modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ItemComponent,
    ItemDetailsComponent,
    AccountComponent,
    CartComponent,
    OrderComponent,
    CategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
