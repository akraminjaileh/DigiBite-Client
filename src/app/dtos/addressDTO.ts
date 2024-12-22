export interface AddressDTO {
    id: number;
    buildingName: string;
    apartmentNumber: string;
    floor: string;
    street: string;
    additionalDirection: string;
    addressLabel: string;
    isPrimary: boolean;
    latitude: number;
    longitude: number;
}