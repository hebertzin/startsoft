import { Injectable } from '@nestjs/common';
import { Order, OrderProperties } from 'src/orders/domain/Order';
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

  async update(id: string, orderProps: OrderProperties): Promise<string> {
    const index = this.orders.findIndex((o) => o.id === id);
    const existingOrder = this.orders[index];
    this.orders[index] = existingOrder;
    return id;
  }
  
  async delete(id: string): Promise<void> {
    const index = this.orders.findIndex((o) => o.id === id);
  
    if (index === -1) {
      throw new Error('Order not found');
    }
  
    this.orders.splice(index, 1);
  }
}
