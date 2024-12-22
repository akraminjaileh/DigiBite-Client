import { CartItemAddonDTO } from "./cartItemAddonDTO";
import { ImageAltTextDTO } from "./imageAltTextDTO";

export interface CartItemDTO {
    id: number;
    quantity: number;
    specialNotes: string | null;
    itemPrice: number;
    cartItemAddons: CartItemAddonDTO[];
    itemInCart: {
        name: string,
        primaryImageUrl: ImageAltTextDTO | null
    };
}