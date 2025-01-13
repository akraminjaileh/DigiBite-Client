import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddressDTO } from 'src/app/dtos/addressDTO';
import { AddressService } from 'src/app/Services/address.service';

@Component({
  selector: 'app-update-address',
  templateUrl: './update-address.component.html',
  styleUrls: ['./update-address.component.css']
})
export class UpdateAddressComponent {

  address: AddressDTO | undefined;
  addressForm: FormGroup | undefined;
  mapEdit: boolean = false;
  label: string[] = [
    'Home'.toLocaleUpperCase(),
    'Work'.toLocaleUpperCase(),
    'Apartment'.toLocaleUpperCase()]

  constructor(
    private fb: FormBuilder,
    public ref: DynamicDialogRef,
    public cofig: DynamicDialogConfig,
    private service: AddressService,
    private router: Router) { }

  ngOnInit(): void {

    this.address = this.cofig.data.address;

    this.addressForm = this.fb.group({
      buildingName: [this.address?.buildingName, Validators.required],
      apartmentNumber: [this.address?.apartmentNumber, Validators.required],
      floor: [this.address?.floor, Validators.required],
      street: [this.address?.street, Validators.required],
      additionalDirection: [this.address?.additionalDirection],
      addressLabel: [this.address?.addressLabel.toLocaleUpperCase() || this.label[0]],
      latitude: [this.address?.latitude || 32.5495446842404],
      longitude: [this.address?.longitude || 35.85655298766844],
      isPrimary: [this.address?.isPrimary]
    });
  }


  markerChanged(event: { lat: number, lng: number }) {
    if (this.addressForm) {
      this.addressForm.value.latitude = event.lat;
      this.addressForm.value.longitude = event.lng;
      this.addressForm.get('latitude')?.markAsDirty()
      this.addressForm.get('longitude')?.markAsDirty()
    }
  }

  onSubmit() {

    if (this.addressForm && this.addressForm.valid) {

      if (!this.addressForm.dirty) {
        this.ref.close();
        return
      }
      //Update Service
      if (this.address) {

        let a = this.addressForm;
        this.address.buildingName = a.get('buildingName')?.dirty ? a.value.buildingName : undefined;
        this.address.additionalDirection = a.get('additionalDirection')?.dirty ? a.value.additionalDirection : undefined;
        this.address.addressLabel = a.get('addressLabel')?.dirty ? a.value.addressLabel : undefined;
        this.address.apartmentNumber = a.get('apartmentNumber')?.dirty ? a.value.apartmentNumber : undefined;
        this.address.floor = a.get('floor')?.dirty ? a.value.floor : undefined;
        this.address.isPrimary = a.get('isPrimary')?.dirty ? a.value.isPrimary : undefined;
        this.address.latitude = a.get('latitude')?.dirty ? a.value.latitude : undefined;
        this.address.longitude = a.get('longitude')?.dirty ? a.value.longitude : undefined;
        this.address.street = a.get('street')?.dirty ? a.value.street : undefined;

        this.service.updateAddress(this.address, this.address.id)
          .subscribe(() => {
            this.ref.close();
            this.refreshComponent();
          });
      }
      else {
        this.service.createAddress(this.addressForm.value)
          .subscribe(() => {
            this.ref.close();
            this.refreshComponent();
          });
      }

    }
    else
      this.addressForm?.markAllAsTouched();
  }


  mapEditChange() {
    this.mapEdit = !this.mapEdit;
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


}
