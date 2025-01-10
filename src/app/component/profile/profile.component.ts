import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { ImageHandler } from 'src/app/config/imageHandler';
import { UpdateProfileDTO } from 'src/app/dtos/updateProfileDTO';
import { UserProfileDTO } from 'src/app/dtos/userProfileDTO';
import { AccountService } from 'src/app/Services/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profileForm: FormGroup | undefined;
  canEdit: boolean = false;
  user: UserProfileDTO | undefined;

  genderOptions: any[] = [
    { name: 'Male', value: 140 },
    { name: 'Female', value: 141 },
    { name: 'none', value: null }
  ];

  constructor(
    private fb: FormBuilder,
    private service: AccountService) { }

  ngOnInit(): void {
    this.service.getProfile()
      .subscribe(u => {

        this.user = u;

        this.profileForm = this.fb.group({
          firstName: [{ value: u.firstName, disabled: !this.canEdit }, [Validators.required, Validators.pattern('^[A-Za-z]{2,20}$')]],
          lastName: [{ value: u.lastName, disabled: !this.canEdit }, [Validators.pattern('^[A-Za-z]{2,20}$')]],
          gender: [{ value: u.gender, disabled: !this.canEdit }],
          dateOfBirth: [{ value: u.dateOfBirth ? new Date(u.dateOfBirth) : null, disabled: !this.canEdit }, []],
          phoneNumber: [{ value: u.phoneNumber, disabled: !this.canEdit }, [Validators.required, Validators.pattern('^07[7-9]{1}[0-9]{7}$')]],
          email: [{ value: u.email, disabled: true }, [Validators.email]],
        });

      });
  }

  edit() {
    this.canEdit = !this.canEdit;
    this.ngOnInit();
  }

  updateProfile() {
    if (this.profileForm?.valid) {

      let dateBirth = new Date(this.profileForm.value.dateOfBirth) || undefined;

      let temp: UpdateProfileDTO = this.profileForm.value;
      temp.dateOfBirth = dateBirth ? dateBirth.toDateString() : undefined;


      temp.firstName = temp.firstName == this.user?.firstName ? undefined : temp.firstName;
      temp.lastName = temp.lastName == this.user?.lastName ? undefined : temp.lastName;
      temp.phoneNumber = temp.phoneNumber == this.user?.phoneNumber ? undefined : temp.phoneNumber;
      temp.gender = temp.gender == this.user?.gender ? undefined : temp.gender;
      if (this.user?.dateOfBirth) {
        let date = new Date(this.user?.dateOfBirth).toDateString();
        temp.dateOfBirth = temp.dateOfBirth == date ? undefined : temp.dateOfBirth;
      }

      this.service.updateProfile(temp).subscribe(() => this.edit());
    }
  }


  updateProfileImage(event: any) {
    let file: File = event.target.files[0];
    if (file) {

      this.service.updateProfileImage(file).subscribe(res => {
        this.edit();
        this.ngOnInit()
      });

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
