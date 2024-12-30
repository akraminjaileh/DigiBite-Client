import { CartDTO } from "./cartDTO";

export interface OrderDetailsDTO {
    id: number;
    creationDateTime: string;
    status: string;
    customerNotes: string;
    rating: number | null;
    paymentMethod: string;
    addressName: string | null;
    cartId: number;
    cart: CartDTO;
}