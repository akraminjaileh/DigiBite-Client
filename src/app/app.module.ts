import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app-component/app.component';
import { MainComponent } from './pages/main/main.component';
import { ItemComponent } from './component/item/item.component';
import { ItemDetailsComponent } from './component/item-details/item-details.component';
import { AccountComponent } from './pages/account/account.component';
import { CategoryComponent } from './component/category/category.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './interceptor/auth.interceptor';
import { LoaderInterceptor } from './interceptor/loader.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ErrorInterceptor } from './interceptor/error.interceptor';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { MaterialModule } from './Modules/material/material.module';
import { HomeComponent } from './pages/home/home.component';
import { NavComponent } from './component/shared/nav/nav.component';
import { FooterComponent } from './component/shared/footer/footer.component';
import { LangInterceptor } from './interceptor/lang.interceptor';
import { PrimengModule } from './Modules/primeng/primeng.module';
import { DialogService } from 'primeng/dynamicdialog';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { DefaultAddressComponent } from './component/address/default-address/default-address.component';
import { ListAddressesComponent } from './component/address/list-addresses/list-addresses.component';
import { CartSidebarComponent } from './component/cart/cart-sidebar/cart-sidebar.component';
import { CartCheckoutComponent } from './component/cart/cart-checkout/cart-checkout.component';
import { ThankYouComponent } from './pages/thank-you/thank-you.component';
import { JdCurrencyPipe } from './pipe/jd-currency.pipe';
import { EmptyCartComponent } from './component/empty-cart/empty-cart.component';
import { ProfileComponent } from './component/profile/profile.component';
import { ProfileOrdersComponent } from './component/profile-orders/profile-orders.component';
import { ProfileAddressesComponent } from './component/profile-addresses/profile-addresses.component';
import { ReactiveFormsModule } from '@angular/forms';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { OrderDetailsComponent } from './component/order-details/order-details.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { DisplayMapComponent } from './component/display-map/display-map.component';
import { UpdateAddressComponent } from './component/address/update-address/update-address.component';
import * as mapboxgl from 'mapbox-gl';
import { ThemeSwitcherComponent } from './component/shared/theme-switcher/theme-switcher.component';

// for translate i18n
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ItemComponent,
    ItemDetailsComponent,
    AccountComponent,
    CategoryComponent,
    NotFoundComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    CheckoutComponent,
    DefaultAddressComponent,
    ListAddressesComponent,
    CartSidebarComponent,
    CartCheckoutComponent,
    ThankYouComponent,
    JdCurrencyPipe,
    EmptyCartComponent,
    ProfileComponent,
    ProfileOrdersComponent,
    ProfileAddressesComponent,
    InvoiceComponent,
    OrderDetailsComponent,
    DisplayMapComponent,
    UpdateAddressComponent,
    ThemeSwitcherComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'fire' }),
    ToastrModule.forRoot(),
    HttpClientModule,
    ReactiveFormsModule,
    MaterialModule,
    PrimengModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: 'pk.eyJ1IjoiYWtyYW1pbmphaWxlaCIsImEiOiJjbTVzZ3lxcHIwYmY0MmlwYTA5emRoNGU3In0.7Tg-mEaepfEdGZ8g3ufxSg'
    })

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LangInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
    DialogService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    //For Arabic Map
    (mapboxgl as any).setRTLTextPlugin(
      'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-rtl-text/v0.2.3/mapbox-gl-rtl-text.js',
      () => { },
      false
    );
  }
}
