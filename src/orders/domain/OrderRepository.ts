import { Order, OrderData, OrderProperties } from './Order';

export interface OrderRepository {
  save(order: OrderProperties): Promise<void>;
  findAll(): Promise<OrderData[]>;
  findById(id: string): Promise<Order | null>;
}
