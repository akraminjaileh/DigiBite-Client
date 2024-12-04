import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LangInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let digiLang: string | null = localStorage.getItem('digiLang');
        if (digiLang) {
            const newRequest = request.clone({
                headers: request.headers
                    .append('Accept-Language', digiLang)
            })
            return next.handle(newRequest);
        }

        return next.handle(request)

    }
}