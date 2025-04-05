import { Order, OrderEssentialProperties } from "./Order";

export interface OrderRepository {
    save(orders: OrderEssentialProperties): Promise<void>;
    findAll(user_id: string): Promise<Order[]>;
    findById(id: string): Promise<Order>;
}
