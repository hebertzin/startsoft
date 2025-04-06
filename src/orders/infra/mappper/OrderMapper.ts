import {
  Order as DomainOrder,
  OrderItem,
  Status,
} from 'src/orders/domain/Order';
import { Order as ORMOrder } from '../models/Orders';

export class OrderMapper {
  static toDomain(order: ORMOrder): DomainOrder {
    const items: OrderItem[] = (order.items || []).map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      name: item.name ?? '',
    }));

    return new DomainOrder(
      order.id,
      order.status as Status,
      items,
      order.createdAt,
      order.updatedAt,
    );
  }

  static toPersistence(order: DomainOrder): ORMOrder {
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
    } as ORMOrder;
  }
}
