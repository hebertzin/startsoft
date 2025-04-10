import { OrderParams, Order } from './Order';

export interface OrderRepository {
  save(order: OrderParams): Promise<string>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: OrderParams): Promise<string>;
  delete(id: string): Promise<void>;
}
