import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let digiToken: string | null = localStorage.getItem("digiToken");

    const newRequest = request.clone({
      headers: request.headers
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${digiToken}`)
    });

    console.log(newRequest.headers)
    return next.handle(newRequest);

  }
}