import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { apiUrls } from '../config/api-urls';
import { signupDTO } from '../dtos/signupDTO';
import { ApiHandlerService } from './api-handler.service';
import { LoginDTO } from '../dtos/loginDTO';
import { ForgetPassDTO } from '../dtos/forgetPassDTO';
import { IResetPassDTO } from '../dtos/iResetPassDTO';
import { ConfirmEmailDTO } from '../dtos/confirmEmailDTO';
import { TokenDTO } from '../dtos/tokenDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private api: ApiHandlerService) { }

  signup(input: signupDTO): Observable<string> {
    return this.api
      .post(apiUrls.account.signup, input)
      .pipe(map(x => x.data));
  }

  login(input: LoginDTO): Observable<TokenDTO> {
    return this.api
      .post(apiUrls.account.login, input)
      .pipe(map(x => x.data));
  }


  forgetPass(input: ForgetPassDTO): Observable<string> {
    return this.api
      .post(apiUrls.account.forgotPassword, input)
      .pipe(map(x => x.data));
  }

  resetPass(input: IResetPassDTO): Observable<string> {
    return this.api
      .post(apiUrls.account.resetPassword, input)
      .pipe(map(x => x.data));
  }

  sendConfirmationEmail(email: string): Observable<string> {
    return this.api
      .post(apiUrls.account.sendConfirmationEmail, { email: email })
      .pipe(map(x => x.data));
  }

  confirmEmail(input: ConfirmEmailDTO): Observable<string> {
    return this.api
      .post(apiUrls.account.confirmEmail, input)
      .pipe(map(x => x.data));
  }

}
