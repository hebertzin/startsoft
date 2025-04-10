import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrderRepository } from '../../domain/OrderRepository';
import { Order as DomainOrder, OrderParams } from '../../domain/Order';
import { OrderMapper } from '../mappper/OrderMapper';
import { OrderModel } from '../models/Orders';
@Injectable()
export class TypeOrmOrderRepository implements OrderRepository {
  constructor(
    @InjectRepository(OrderModel)
    private readonly orderRepo: Repository<OrderModel>,
  ) {}

  async save(order: DomainOrder): Promise<string> {
    const ormOrder = OrderMapper.toPersistence(order);
    const result = await this.orderRepo.save(ormOrder);
    return result.id;
  }

  async findAll(): Promise<DomainOrder[]> {
    const orders = await this.orderRepo.find();
    return orders.map(OrderMapper.toDomain);
  }

  async findById(id: string): Promise<DomainOrder | null> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (!order) throw new Error('Order not found');
    return OrderMapper.toDomain(order);
  }

  async update(id: string, order: OrderParams): Promise<string> {
    await this.orderRepo.update(id, order);
    return id;
  }

  async delete(id: string): Promise<void> {
    const order = await this.orderRepo.findOne({ where: { id } });
    if (order) await this.orderRepo.remove(order);
  }
}
