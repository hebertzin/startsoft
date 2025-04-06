import {
  createOrderInput,
  Order,
  OrderData,
  OrderProperties,
  Status,
} from './Order';

export interface OrderUseCase {
  save(order: createOrderInput): Promise<string>;
  findAll(): Promise<OrderData[]>;
  findById(id: string): Promise<Order | null>;
  update(id: string, order: OrderProperties): Promise<string>;
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
