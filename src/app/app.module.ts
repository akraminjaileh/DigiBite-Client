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
    CartComponent,
    OrderComponent,
    CategoryComponent,
    NotFoundComponent,
    HomeComponent,
    NavComponent,
    FooterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgxSpinnerModule.forRoot({ type: 'fire' }),
    ToastrModule.forRoot(),
    HttpClientModule,
    MaterialModule,
    PrimengModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
