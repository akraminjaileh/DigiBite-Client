import { Component } from '@angular/core';
import { ImageHandler } from 'src/app/config/imageHandler';
import { OrderDetailsDTO } from 'src/app/dtos/orderDetailsDTO';
import { CheckoutService } from 'src/app/Services/checkout.service';

@Component({
  selector: 'app-thank-you',
  templateUrl: './thank-you.component.html',
  styleUrls: ['./thank-you.component.css']
})
export class ThankYouComponent {

  orderDetails: OrderDetailsDTO | undefined;

  constructor(private service: CheckoutService) { }

  ngOnInit(): void {
    this.service.thankYou(2).subscribe(res => this.orderDetails = res);
  }

  printInvoice(): void {
    const printContent = document.querySelector('.thank-you-container');
    if (printContent) {
      const printWindow = window.open('', '', 'width=800,height=600');
      printWindow?.document.write('<html><head><title>Invoice</title></head><body>');
      printWindow?.document.write(printContent.innerHTML);
      printWindow?.document.write('</body></html>');
      printWindow?.document.close();
      printWindow?.print();
    }
  }


  imageHandler(url: string | undefined) {
    return ImageHandler.url(url);
  }

  onImageError(event: Event) {
    const target = event.target as HTMLImageElement;
    target.src = ImageHandler.noImage;
  }


}
