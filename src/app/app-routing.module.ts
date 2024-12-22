import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HomeComponent } from './pages/home/home.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

const routes: Routes = [
  {
    path: "", component: MainComponent, children: [
      { path: "", component: HomeComponent },
      { path: "checkout", component: CheckoutComponent },

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
