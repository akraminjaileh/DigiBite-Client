import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { ToastrService } from "ngx-toastr"
import { catchError, Observable, throwError } from "rxjs"
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
                    this.toaster.warning("you must to login")
                    this.router.navigate([apiUrls.account.login])
                    localStorage.removeItem('token')

                }

                else if (error.status == 0) {
                    this.toaster.error('Something went wrong.')
                }

                else if (error.error.errorMsg == "Login is not allowed. Please confirm your email") {
                    return throwError(() => error);
                }
                else {
                    this.toaster.error(error.error?.errorMsg || 'An unexpected error occurred.')
                }

                throw error
            })
        )
    }
}

