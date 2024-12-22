import { AddOnDTO } from "./addOnDTO";

export interface AddOnContainerDTO {
    id: number;
    name: string;
    addons: AddOnDTO[];
}