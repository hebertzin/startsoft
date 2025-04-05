import { Inject, Injectable } from '@nestjs/common';
import { createOrderInput, Order, Status } from 'src/orders/domain/Order';
import { OrderRepository } from 'src/orders/domain/OrderRepository';
import { InjectionToken } from '../InjectToken';
import { v4 as uuidv4 } from 'uuid'; // 👈 importa aqui

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
}
