import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { HttpResponse } from 'src/http/http';
import { OrderUseCase } from 'src/orders/application/useCase/OrderUseCase';
import { CreateOrderDTO } from '../dto/CreateOrderDTO';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderUseCase: OrderUseCase) { }

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

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findById(@Param("id") order_id: string) {
    const order = await this.orderUseCase.findById(order_id);
    return HttpResponse.ok(order, 'Order found successfully');
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') order_id: string,
    @Body() updateOrderDto: any,
  ) {
    const updatedOrderId = await this.orderUseCase.update(order_id, updateOrderDto);
    return HttpResponse.ok({ id: updatedOrderId }, 'Order updated successfully');
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') order_id: string): Promise<void> {
    await this.orderUseCase.delete(order_id);
  }


}
