import { DOCUMENT } from "@angular/common";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LangInterceptor implements HttpInterceptor {

    constructor(@Inject(DOCUMENT) private document: Document) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        let lang: string = this.document.documentElement.lang || localStorage.getItem('lang') || 'en';

        const newRequest = request.clone({
            headers: request.headers
                .set('Accept-Language', lang)
        })
        console.log("newRequest*******")
        console.log(newRequest)
        return next.handle(newRequest);

    }
}