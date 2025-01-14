import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';
import { AddressDTO } from 'src/app/dtos/addressDTO';
import { AddressesDTO } from 'src/app/dtos/addressesDTO';
import { AddressService } from 'src/app/Services/address.service';
import { UpdateAddressComponent } from '../address/update-address/update-address.component';
import { ConfirmationService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-addresses',
  templateUrl: './profile-addresses.component.html',
  styleUrls: ['./profile-addresses.component.css'],
  providers: [ConfirmationService]
})
export class ProfileAddressesComponent {

  private subscription: Subscription = new Subscription;
  addresses: AddressesDTO[] = [];
  address: AddressDTO | undefined;
  selectedAddresses: AddressesDTO | undefined;
  ref: DynamicDialogRef = new DynamicDialogRef;


  constructor(
    private service: AddressService,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService,
    private router: Router) { }

  ngOnInit(): void {

    this.subscription.add(
      this.service.getAddresses().subscribe(res => {

        this.addresses = res;

        if (res) {
          this.selectedAddresses = res.find(x => x.isPrimary == true) || res[0];
          this.getAddress(this.selectedAddresses.id);
        }

      }));

  }


  getAddress(id: number) {
    this.service.getAddressById(id).subscribe(res => {
      this.address = res;
    });

  }



  openDialog(address: AddressDTO | undefined) {

    this.ref = this.dialogService.open(UpdateAddressComponent,
      {
        data: {
          address: address
        },
        header: 'Address Details',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false
      });

  }

  confirm(event: Event, id: number | undefined) {
    this.confirmationService.confirm({
      target: event.target || undefined,
      message: 'Are you sure to delete?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.remove(id);
      },
      reject: () => {
        this.confirmationService.close();
      }
    });
  }

  remove(id: number | undefined) {
    if (id)
      this.service.removeAddress(id).subscribe(() => {
        this.confirmationService.close();
        this.refreshComponent();
      });
  }


  refreshComponent() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/Fake-Url-For-Reload',
      {
        skipLocationChange: true

      }).then(() => {
        this.router.navigate([currentUrl]);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
