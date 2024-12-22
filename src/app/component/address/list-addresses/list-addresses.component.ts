import { Component } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AddressesDTO } from 'src/app/dtos/addressesDTO';
import { AddressService } from 'src/app/Services/address.service';
import { BehaviorService } from 'src/app/Services/behavior.service';

@Component({
  selector: 'app-list-addresses',
  templateUrl: './list-addresses.component.html',
  styleUrls: ['./list-addresses.component.css']
})
export class ListAddressesComponent {
  private subscriptions: Subscription = new Subscription();
  addresses: AddressesDTO[] | undefined;
  addressId: number | undefined;

  constructor(
    private service: AddressService,
    private behavior: BehaviorService,
    public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.subscriptions.add(
      this.behavior.getAddressId().subscribe(x => this.addressId = x));
    this.subscriptions.add(
      this.service.getAddresses()
        .subscribe(res => this.addresses = res));
  }

  selectedAddress() {

    if (this.addressId)
      this.behavior.setAddressId(this.addressId);

    this.ref.close();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

}
