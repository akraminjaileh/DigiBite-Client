import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { ProfileAddressesComponent } from './component/profile-addresses/profile-addresses.component';
import { ProfileOrdersComponent } from './component/profile-orders/profile-orders.component';
import { ProfileComponent } from './component/profile/profile.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      { path: "", component: HomeComponent },
      {
        path: "account", children: [
          { path: "", component: ProfileComponent },
          { path: "addresses", component: ProfileAddressesComponent },
          { path: "orders", component: ProfileOrdersComponent }
        ]
      },
      {
        path: "checkout", children: [
          { path: "", component: CheckoutComponent },
          { path: "thank-you", component: ThankYouComponent },
        ]
      },

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
