import { ImageAltTextDTO } from "./imageAltTextDTO";
import { IngredientsWithDetailsDTO } from "./ingredientsWithDetailsDTO";

export interface ItemsDTO {
    id: number;
    name: string;
    price: number;
    primaryImageUrl: ImageAltTextDTO | undefined;
    ingredients: IngredientsWithDetailsDTO[];
    isAvailable: boolean | null;
    isInMenu: boolean | null;
}