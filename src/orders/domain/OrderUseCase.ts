import { createOrderInput, Order, OrderData, OrderProperties, Status } from './Order';

export interface OrderUseCase {
  save(order: createOrderInput): Promise<void>;
  findAll(): Promise<OrderData[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: OrderProperties): Promise<string>;
  delete(id: string): Promise<void>;
  searchByStatus(status: Status): Promise<Order>
}
