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
        style: router.url.endsWith('/account') ? { color: '#495057', 'background-color': '#E8F5E9', 'border': '2px solid #b2ddb4' } : {}
      },
      { separator: true },
      {
        label: 'Orders',
        icon: 'pi pi-box',
        routerLink: '/account/orders',
        style: router.url.includes('/account/orders') ? { color: '#495057', 'background-color': '#E8F5E9', 'border': '2px solid #b2ddb4' } : {}
      },
      { separator: true },
      {
        label: 'Addresses',
        icon: 'pi pi-map',
        routerLink: '/account/addresses',
        style: router.url.includes('/account/addresses') ? { color: '#495057', 'background-color': '#E8F5E9', 'border': '2px solid #b2ddb4' } : {}
      }
    ];
  }

}
