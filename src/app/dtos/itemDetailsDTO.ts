import { AddOnContainerDTO } from "./addOnContainerDTO";
import { ImageAltTextDTO } from "./imageAltTextDTO";
import { IngredientsWithImageDTO } from "./ingredientsWithImageDTO";

export interface ItemDetailsDTO {
    id: number;
    name: string;
    description: string;
    price: number;
    isAvailable: boolean | null;
    isInMenu: boolean | null;
    imageUrls: ImageAltTextDTO[];
    ingredients: IngredientsWithImageDTO[];
    addOnContainers: AddOnContainerDTO[];
    categoryName: string | null;

}