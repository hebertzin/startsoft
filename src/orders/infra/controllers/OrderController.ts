import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { OrderUseCase } from 'src/orders/application/useCase/OrderUseCase';
import { CreateOrderInput } from 'src/orders/domain/Order';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Post()
  async create(@Body() input: CreateOrderInput, @Res() res: Response) {
    await this.orderUseCase.save(input);
    return res.status(HttpStatus.CREATED).json({ message: 'Order Created succesfully' });
  }
}
