import { Component } from '@angular/core';
import { OrdersByDateDTO } from 'src/app/dtos/ordersByDateDTO';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css']
})
export class ProfileOrdersComponent {

  orders: OrdersByDateDTO[] = [];

  constructor(private service: AccountService) { }

  ngOnInit(): void {
    this.service.orders().subscribe(res => this.orders = res);
  }

}
