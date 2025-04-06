import { Order } from './Order';

export interface ElasticOrderSearch {
  index(order: Order): Promise<void>;
  searchByStatus(status: string): Promise<Partial<Order>[]>;
  searchByItemName(item: string): Promise<Partial<Order[]>>
  filterOrders(params: {
    id?: string;
    status?: string;
    start?: string;
    end?: string;
    item?: string;
  }): Promise<Partial<Order>[]>;
}
