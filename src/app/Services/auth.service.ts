import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { apiUrls } from '../config/api-urls';
import { signupDTO } from '../dtos/signupDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(data: signupDTO): Observable<any> {
    return this.http.post(apiUrls.account.signup, data)
  }

}
