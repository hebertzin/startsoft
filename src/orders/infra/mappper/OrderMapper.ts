import {
  Order,
  OrderItem,
} from 'src/orders/domain/Order';
import { OrderModel } from '../models/Orders';
import { Status } from 'src/orders/domain/OrderStatus';

export class OrderMapper {
  static toDomain(order: OrderModel): Order {
    const items: OrderItem[] = (order.items || []).map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item.name ?? '',
    }));

    return new Order(
      order.id,
      order.status as Status,
      items,
      order.createdAt,
      order.updatedAt,
    );
  }

  static toPersistence(order: Order): OrderModel {
    return {
      id: order.id,
      status: order.status,
      items: order.items.map((item) => {
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: item.price,
          name: item.name,
        };
      }),
      createdAt: order.createdAt,
      updatedAt: order.updatedAt,
    } as OrderModel;
  }
}
