import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { AddressDTO } from 'src/app/dtos/addressDTO';
import { AddressesDTO } from 'src/app/dtos/addressesDTO';
import { AddressService } from 'src/app/Services/address.service';

@Component({
  selector: 'app-profile-addresses',
  templateUrl: './profile-addresses.component.html',
  styleUrls: ['./profile-addresses.component.css']
})
export class ProfileAddressesComponent {

  private subscription: Subscription = new Subscription;
  addresses: AddressesDTO[] = [];
  address: AddressDTO | undefined;
  selectedAddresses: AddressesDTO | undefined;

  constructor(
    private sanitizer: DomSanitizer,
    private service: AddressService) { }

  ngOnInit(): void {

    this.subscription.add(
      this.service.getAddresses().subscribe(res => {

        this.addresses = res;

        if (res) {
          this.selectedAddresses = res[0];
          this.getAddress(res[0]?.id);
        }

      }));
  }


  getAddress(id: number) {
    this.service.getAddressById(id).subscribe(res => {
      this.address = res;
    });
  }

  mapURL(lat: number | undefined, long: number | undefined): SafeResourceUrl {
    if (lat && long) {
      const rawURL = `https://maps.google.com/maps?q=${lat},${long}&hl=en&z=16&output=embed`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(rawURL);
    }
    return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  }



  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
