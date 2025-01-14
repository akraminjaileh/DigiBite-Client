import { ImageAltTextDTO } from "./imageAltTextDTO";

export interface CategoryDTO {
    id: number;
    name: string;
    imageUrl?: ImageAltTextDTO;
}