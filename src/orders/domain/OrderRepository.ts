import { Order, OrderProperties } from './Order';

export interface OrderRepository {
  save(order: OrderProperties): Promise<void>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
}
