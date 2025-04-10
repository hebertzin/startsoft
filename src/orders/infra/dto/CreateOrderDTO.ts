import {
  IsArray,
  ValidateNested,
  IsString,
  IsNumber,
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

export class OrderDTO {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDTO)
  items: OrderItemDTO[];
}
