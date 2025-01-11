import { Component, Input } from '@angular/core';
import { OrderDetailsDTO } from 'src/app/dtos/orderDetailsDTO';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent {

  @Input() orderDetails: OrderDetailsDTO | undefined;

}
