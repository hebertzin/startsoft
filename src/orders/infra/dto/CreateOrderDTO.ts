import { IsUUID, ValidateNested, ArrayNotEmpty } from 'class-validator';

import { OrderItem } from 'src/orders/domain/Order';

export class CreateOrderInput {
  @IsUUID()
  id: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  items: OrderItem[];
}
