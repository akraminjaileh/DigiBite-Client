import { OrdersDTO } from "./ordersDTO";

export interface OrdersByDateDTO {
    date: string | undefined;
    orders: OrdersDTO[] | undefined;
}