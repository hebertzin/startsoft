import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { Response } from 'express';
import { HttpResponse } from 'src/http/http';
import { OrderUseCase } from 'src/orders/application/useCase/OrderUseCase';
import { CreateOrderDTO } from '../dto/CreateOrderDTO';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() input: CreateOrderDTO) {
    await this.orderUseCase.save(input);
    return HttpResponse.created(null, 'Order created successfully');
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const all = await this.orderUseCase.findAll();
    return HttpResponse.ok(all, 'Orders found successfully');
  }
}
