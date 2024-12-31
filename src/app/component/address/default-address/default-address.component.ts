import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressDTO } from 'src/app/dtos/addressDTO';
import { AddressService } from 'src/app/Services/address.service';
import { ListAddressesComponent } from '../list-addresses/list-addresses.component';
import { BehaviorService } from 'src/app/Services/behavior.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-default-address',
  templateUrl: './default-address.component.html',
  styleUrls: ['./default-address.component.css']
})
export class DefaultAddressComponent {

  private subscription: Subscription = new Subscription;

  mapURL: SafeResourceUrl | undefined;
  address: AddressDTO | undefined;
  ref: DynamicDialogRef | undefined;
  addressId: number | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private service: AddressService,
    public dialogService: DialogService,
    private behavior: BehaviorService
  ) { }

  ngOnInit(): void {

    this.subscription.add(
      this.behavior.getAddressId()
        .subscribe(id => {
          this.addressId = id;

          if (this.addressId) {
            this.service.getAddressById(this.addressId)
              .subscribe(res => {
                this.address = res;
                const rawURL = `https://maps.google.com/maps?q=${res.latitude},${res.longitude}&hl=en&z=16&output=embed`;
                this.mapURL = this.sanitizer.bypassSecurityTrustResourceUrl(rawURL);
              });
          }
        }));

    if (!this.addressId)
      this.subscription.add(
        this.service.getDefaultAddress()
          .subscribe(res => {
            if (res) {
              this.address = res;
              this.behavior.setAddressId(res.id);
              const rawURL = `https://maps.google.com/maps?q=${res.latitude},${res.longitude}&hl=en&z=16&output=embed`;
              this.mapURL = this.sanitizer.bypassSecurityTrustResourceUrl(rawURL);
            }
          }));
  }


  openDialog() {

    this.ref = this.dialogService.open(ListAddressesComponent,
      {
        header: 'Your Saved Address',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
