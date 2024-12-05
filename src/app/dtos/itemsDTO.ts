import { IngredientsWithDetailsDTO } from "./ingredientsWithDetailsDTO";

export interface ItemsDTO {
    id: number;
    name: string;
    price: number;
    primaryImageUrl: string | null;
    ingredients: IngredientsWithDetailsDTO[];
    isAvailable: boolean | null;
    isInMenu: boolean | null;
}