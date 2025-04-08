import {
  Inject,
  Injectable,
  Logger,
  LoggerService,
  NotFoundException,
} from '@nestjs/common';
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
    @Inject(InjectionToken.LOGGER)
    private readonly logger: LoggerService,
  ) {}

  async save(input: createOrderInput): Promise<string> {
    const now = new Date();
    const order = new Order(uuidv4(), Status.PENDING, input.items, now, now);
    const orderId = await this.orderRepository.save(order);

    this.logger.log(`Order [${orderId}] saved to repository`);

    await Promise.all([
      this.elasticOrderSearch.index(order),
      this.eventPublisher.publishOrderCreated(order),
    ]);

    this.logger.log(
      `Order [${orderId}] indexed in ElasticSearch and event published`,
    );

    return orderId;
  }

  async findAll(): Promise<OrderData[]> {
    this.logger.log('Fetching all orders');
    return await this.orderRepository.findAll();
  }

  async findById(order_id: string): Promise<Order> {
    this.logger.log(`Fetching order with id ${order_id}`);
    const order = await this.orderRepository.findById(order_id);
    if (!order) {
      this.logger.warn(`Order [${order_id}] not found`);
      throw new NotFoundException('Order not found');
    }
    return order;
  }

  async update(order_id: string, order: Order): Promise<string> {
    this.logger.log(`Updating order [${order_id}]`);
    const updated = await this.orderRepository.update(order_id, order);

    await Promise.all([
      this.elasticOrderSearch.index(order),
      this.eventPublisher.publishOrderUpdated(order),
    ]);

    this.logger.log(
      `Order [${order_id}] updated, re-indexed and event published`,
    );
    return updated;
  }

  async delete(id: string): Promise<void> {
    await this.orderRepository.delete(id);
  }

  async searchByStatus(status: string): Promise<Partial<Order>[]> {
    this.logger.log(`Searching orders with status: ${status}`);
    return await this.elasticOrderSearch.searchByStatus(status);
  }

  async searchItemsByName(name: string): Promise<Partial<Order[]>> {
    return this.elasticOrderSearch.searchByItemName(name);
  }

  async filterOrders(params: {
    id?: string;
    status?: string;
    start?: string;
    end?: string;
    item?: string;
  }): Promise<Partial<Order>[]> {
    this.logger.log(
      `Filtering orders with params: [${JSON.stringify(params)}]`,
    );
    return this.elasticOrderSearch.filterOrders(params);
  }
}
