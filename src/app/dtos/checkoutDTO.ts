export interface CheckoutDTO {
    customerNotes: string | undefined;
    paymentMethod: string;
    userAddressId: number | undefined;
}