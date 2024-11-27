import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { catchError, Observable } from "rxjs"
import { apiUrls } from "../config/api-urls"

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private toaster: ToastrService,
        private router: Router
    ) { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status == 401) {
                    this.router.navigate([apiUrls.account.login])
                    localStorage.removeItem('digiToken')
                    this.toaster.warning("you must to login")

                }

                else if (error.status == 0) {
                    this.toaster.error('Something went wrong.')
                }
                else {
                    this.toaster.error(error.error.errorMsg)
                }
                throw error
            })
        )
    }
}