import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  private email: BehaviorSubject<string>;

  constructor() {
    this.email = new BehaviorSubject<string>('');
  }

  setEmail(input: string) {
    return this.email.next(input)
  }

  getEmail() {

  }

}
