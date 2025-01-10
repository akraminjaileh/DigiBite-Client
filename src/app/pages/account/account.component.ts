import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
  items: MenuItem[];

  constructor() {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/account'
      },
      { separator: true },
      {
        label: 'Orders',
        icon: 'pi pi-box',
        routerLink: '/account/orders'
      },
      { separator: true },
      {
        label: 'Addresses',
        icon: 'pi pi-map',
        routerLink: '/account/addresses'
      }
    ];
  }



}
