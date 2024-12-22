export interface AddToCartDTO {
    itemId: number | null;
    mealId: number | null;
    quantity: number;
    specialNotes: string | null;
    cartItemAddonIDs: number[] | null;
}