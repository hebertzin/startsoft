import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from 'src/http/http';
import { OrderUseCase } from 'src/orders/application/useCase/OrderUseCase';
import { CreateOrderInput } from '../dto/CreateOrderDTO';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() input: CreateOrderInput, @Res() res: Response) {
    await this.orderUseCase.save(input);
    return HttpResponse.created(null, 'Order created successfully');
  }
}
