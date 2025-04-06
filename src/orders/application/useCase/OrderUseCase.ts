import { Inject, Injectable } from '@nestjs/common';
import {
  createOrderInput,
  Order,
  OrderData,
  Status,
} from 'src/orders/domain/Order';
import { OrderRepository } from 'src/orders/domain/OrderRepository';
import { InjectionToken } from '../InjectToken';
import { v4 as uuidv4 } from 'uuid'; 

@Injectable()
export class OrderUseCase {
  constructor(
    @Inject(InjectionToken.ORDERS_REPOSITORY)
    private readonly orderRepository: OrderRepository,
  ) {}

  async save(input: createOrderInput): Promise<void> {
    const now = new Date();
    const order = new Order(uuidv4(), Status.PENDING, input.items, now, now);

    await this.orderRepository.save(order);
  }

  async findAll(): Promise<OrderData[]> {
    return await this.orderRepository.findAll();
  }
}
