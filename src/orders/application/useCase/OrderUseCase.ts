import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  createOrderInput,
  Order,
  OrderData,
  OrderProperties,
  Status,
} from 'src/orders/domain/Order';
import { OrderRepository } from 'src/orders/domain/OrderRepository';
import { InjectionToken } from '../InjectToken';
import { v4 as uuidv4 } from 'uuid';
import { OrderEventPublisher } from 'src/orders/domain/OrderEventPublisher';
import { ElasticOrderSearch } from 'src/orders/domain/OrderSearch';

@Injectable()
export class OrderUseCase {
  constructor(
    @Inject(InjectionToken.ORDERS_REPOSITORY)
    private readonly orderRepository: OrderRepository,
    @Inject(InjectionToken.ORDER_EVENT_PUBLISHER)
    private readonly eventPublisher: OrderEventPublisher,
    @Inject(InjectionToken.ORDER_ELASTIC_SEARCH)
    private readonly elasticOrderSearch: ElasticOrderSearch,
  ) {}

  async save(input: createOrderInput): Promise<string> {
    const now = new Date();
    const order = new Order(uuidv4(), Status.PENDING, input.items, now, now);
    const orderId = await this.orderRepository.save(order);
    await this.elasticOrderSearch.index(order);
    await this.eventPublisher.publishOrderCreated(order);
    return orderId;
  }

  async findAll(): Promise<OrderData[]> {
    return await this.orderRepository.findAll();
  }

  async findById(order_id: string): Promise<Order> {
    const order = await this.orderRepository.findById(order_id);
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(order_id: string, order: Order): Promise<string> {
    const updated = await this.orderRepository.update(order_id, order);
    await this.eventPublisher.publishOrderStatusUpdated(updated);
    await this.elasticOrderSearch.index(order)
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async searchByStatus(status: string) {
    return await this.elasticOrderSearch.searchByStatus(status);
  }

  async searchItemsByName(name: string) {
    return await this.elasticOrderSearch.searchByItemName(name);
  }

  async filterOrders(params: {
    id?: string;
    status?: string;
    start?: string;
    end?: string;
    item?: string;
  }): Promise<Partial<Order>[]> {
    return await this.elasticOrderSearch.filterOrders(params);
  }
}
