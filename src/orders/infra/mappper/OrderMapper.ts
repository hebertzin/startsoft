import { Order as DomainOrder, Status } from 'src/orders/domain/Order';
import { Order as ORMOrder } from '../models/Orders';

export class OrderMapper {
  static toDomain(order: ORMOrder): DomainOrder {
    return new DomainOrder(
      order.id,
      order.status as Status,
      order.items,
      order.createdAt,
      order.updatedAt,
    );
  }

  static toPersistence(order: DomainOrder): ORMOrder {
    const ormOrder = new ORMOrder();
    ormOrder.id = order.id;
    ormOrder.status = order.status;
    ormOrder.items = order.items;
    ormOrder.createdAt = order.createdAt;
    ormOrder.updatedAt = order.updatedAt;
    return ormOrder;
  }
}
