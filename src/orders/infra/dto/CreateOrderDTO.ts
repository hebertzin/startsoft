import {
  IsUUID,
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class OrderItemDTO {
  @IsString()
  productId: string;

  @IsNumber()
  quantity: number;

  @IsNumber()
  price: number;

  @IsString()
  name: string;
}

export class CreateOrderDTO {
  @IsUUID()
  id: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
