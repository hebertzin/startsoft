import { Order } from './Order';

export interface ElasticOrderSearch {
  index(order: Order): Promise<void>;
  searchByStatus(status: string): Promise<Partial<Order>[]>;
}
