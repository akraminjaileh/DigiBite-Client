import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { OrdersByDateDTO } from 'src/app/dtos/ordersByDateDTO';
import { AccountService } from 'src/app/Services/account.service';
import { OrderDetailsComponent } from '../order-details/order-details.component';

@Component({
  selector: 'app-profile-orders',
  templateUrl: './profile-orders.component.html',
  styleUrls: ['./profile-orders.component.css']
})
export class ProfileOrdersComponent {

  orders: OrdersByDateDTO[] = [];
  ref: DynamicDialogRef = new DynamicDialogRef;

  constructor(
    private service: AccountService,
    public dialogService: DialogService) { }

  ngOnInit(): void {
    this.service.orders().subscribe(res => this.orders = res);
  }

  showDialog(id: number) {
    if (Number.isInteger(id)) {
      this.ref = this.dialogService.open(OrderDetailsComponent,
        {
          data: {
            id: id
          },
          header: 'Order Details',
          width: '70%',
          contentStyle: { overflow: 'auto' },
          baseZIndex: 10000,
          maximizable: true
        });
    }
  }


}
