import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
import { OrderParams, Order } from 'src/orders/domain/Order';
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
    @Inject(InjectionToken.LOGGER)
    private readonly logging: LoggerService,
  ) { }

  public async save(input: OrderParams): Promise<string> {
    try {
      this.logging.log(`[OrderUseCase] Starting to create order`);

      const orderId = await this.orderRepository.save(input);

      this.logging.log(`Order [${orderId}] saved to repository`);

      await Promise.all([
        this.elasticOrderSearch.index(input),
        this.eventPublisher.publishOrderCreated(input),
      ]);

      this.logging.log(
        `Order [${orderId}] indexed in ElasticSearch and event published`,
      );

      return orderId;
    } catch (err) {
      this.logging.error(`[OrderUseCase] Error: ${err.message}`, err.stack);
      
      throw new BadRequestException('Order not created');
    }

  }

  public async findAll(): Promise<Order[]> {
    this.logging.log(`[OrderUseCase] Fetching all orders`);
    return await this.orderRepository.findAll();
  }

  public async findById(order_id: string): Promise<Order> {
    this.logging.log(`[OrderUseCase] Finding order with ID: ${order_id}`);

    const order = await this.orderRepository.findById(order_id);

    if (!order) {
      this.logging.warn(`[OrderUseCase] order not found with ID: ${order_id}`);
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  public async update(order_id: string, order: Order): Promise<string> {
    this.logging.log(`[OrderUseCase] Starting to updating order [${order_id}]`);

    const updated = await this.orderRepository.update(order_id, order);

    await Promise.all([
      this.elasticOrderSearch.index(order),
      this.eventPublisher.publishOrderUpdated(order),
    ]);

    this.logging.log(
      `Order [${order_id}] updated, re-indexed and event published`,
    );

    return updated;
  }

  public async delete(order_id: string): Promise<void> {
    this.logging.log(`[OrderUseCase] Starting to deleting order [${order_id}]`);

    await this.orderRepository.delete(order_id);
  }

  public async searchByStatus(status: string): Promise<Partial<Order>[]> {
    this.logging.log(`[OrderUseCase] Searching orders with status: ${status}`);
    return await this.elasticOrderSearch.searchByStatus(status);
  }

  public async searchItemsByName(name: string): Promise<Partial<Order[]>> {
    return this.elasticOrderSearch.searchByItemName(name);
  }

  public async filterOrders(params: {
    id?: string;
    status?: string;
    start?: string;
    end?: string;
    item?: string;
  }): Promise<Partial<Order>[]> {
    this.logging.log(
      `[OrderUseCase] Filtering orders with params: [${JSON.stringify(params)}]`,
    );

    return this.elasticOrderSearch.filterOrders(params);
  }
}
