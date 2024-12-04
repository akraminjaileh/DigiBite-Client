import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AccountComponent } from './pages/account/account.component';
import { CartComponent } from './pages/cart/cart.component';
import { ItemDetailsComponent } from './pages/item-details/item-details.component';
import { OrderComponent } from './pages/order/order.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      { path: "", component: HomeComponent },
      { path: "account", component: AccountComponent },
      { path: "cart", component: CartComponent },
      { path: "itemDetails", component: ItemDetailsComponent },
      { path: "order", component: OrderComponent },

    ]
  },

  { path: "auth", loadChildren: () => import("./Modules/auth/auth.module").then(x => x.AuthModule) },
  { path: "error", component: NotFoundComponent },
  { path: '**', redirectTo: 'error' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
