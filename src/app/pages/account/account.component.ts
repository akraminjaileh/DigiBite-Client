import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {

  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [
      {
        label: 'Profile',
        icon: 'pi pi-user',
        routerLink: '/account',
        styleClass: router.url.endsWith('/account') ? 'menu-highlight' : ''
      },
      { separator: true },
      {
        label: 'Orders',
        icon: 'pi pi-box',
        routerLink: '/account/orders',
        styleClass: router.url.includes('/account/orders') ? 'menu-highlight' : ''
      },
      { separator: true },
      {
        label: 'Addresses',
        icon: 'pi pi-map',
        routerLink: '/account/addresses',
        styleClass: router.url.includes('/account/addresses') ? 'menu-highlight' : ''
      }
    ];
  }

}
