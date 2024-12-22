import { CartItemDTO } from "./cartItemDTO";

export interface CartDTO {
    id: number;
    cartStatus: string;
    subtotal: number | null;
    discount: number | null;
    voucherDiscount: number | null;
    deliveryFee: number | null;
    serviceFee: number | null;
    totalAmount: number | null;
    voucherId: number | null;
    cartItems: CartItemDTO[];
}