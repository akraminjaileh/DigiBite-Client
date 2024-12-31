import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorService {

  private categoryId: BehaviorSubject<number | null>;
  private sidebarVisible: BehaviorSubject<boolean>;
  private addressId: BehaviorSubject<number | undefined>;
  private orderId: BehaviorSubject<number | undefined>;

  constructor() {
    this.categoryId = new BehaviorSubject<number | null>(null);
    this.sidebarVisible = new BehaviorSubject<boolean>(false);
    this.addressId = new BehaviorSubject<number | undefined>(undefined);
    this.orderId = new BehaviorSubject<number | undefined>(undefined);
  }

  setCategoryId(input: number) {
    return this.categoryId.next(input)
  }

  getCategoryId(): Observable<number | null> {
    return this.categoryId.asObservable();
  }

  setSidebarVisible(input: boolean) {
    return this.sidebarVisible.next(input)
  }

  getSidebarVisible(): Observable<boolean> {
    return this.sidebarVisible.asObservable();
  }

  setAddressId(input: number) {
    return this.addressId.next(input)
  }

  getAddressId(): Observable<number | undefined> {
    return this.addressId.asObservable();
  }

  setOrderId(input: number) {
    return this.orderId.next(input)
  }

  getOrderId(): Observable<number | undefined> {
    return this.orderId.asObservable();
  }

}
