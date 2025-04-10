import {
  OrderParams,
  Order,
} from './Order';
import { Status } from './OrderStatus';

export interface OrderUseCase {
  save(order: OrderParams): Promise<string>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: OrderParams): Promise<string>;
  delete(id: string): Promise<void>;
  searchByStatus(status: Status): Promise<Order>;
  filterOrders(params: {
    id?: string;
    status?: string;
    start?: string;
    end?: string;
    item?: string;
  }): Promise<Partial<Order>[]>;
}
