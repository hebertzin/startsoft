import { Injectable } from '@nestjs/common';
import { Order } from 'src/orders/domain/Order';
import { OrderRepository } from 'src/orders/domain/OrderRepository';

@Injectable()
export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];

  async save(order: Order): Promise<void> {
    this.orders.push(order);
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findById(id: string): Promise<Order> {
    const order = this.orders.find((o) => o.id === id);
    if (!order) throw new Error('Order not found');
    return order;
  }
}
