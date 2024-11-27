import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    const newRequest = request.clone({
      headers: request.headers
        .append('Authorization', 'Bearer ' + localStorage.getItem('token'))
    })

    return next.handle(newRequest);
  }
}