import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { HttpResponse } from 'src/http/http';
import { CreateOrderDTO } from '../dto/CreateOrderDTO';
import { Order } from '../models/Orders';
import { OrderUseCase } from 'src/orders/domain/OrderUseCase';
import { InjectionToken } from 'src/orders/application/InjectToken';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(InjectionToken.ORDERS_USE_CASE)
    private readonly orderUseCase: OrderUseCase
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDTO })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  async create(@Body() input: CreateOrderDTO) {
    await this.orderUseCase.save(input);
    return HttpResponse.created(null, 'Order created successfully');
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Orders found successfully',
    type: [Order],
  })
  async findAll() {
    const all = await this.orderUseCase.findAll();
    return HttpResponse.ok(all, 'Orders found successfully');
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 200,
    description: 'Order found successfully',
    type: Order,
  })
  async findById(@Param('id') order_id: string) {
    const order = await this.orderUseCase.findById(order_id);
    return HttpResponse.ok(order, 'Order found successfully');
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  async update(@Param('id') order_id: string, @Body() updateOrderDto: any) {
    const updatedOrderId = await this.orderUseCase.update(
      order_id,
      updateOrderDto,
    );
    return HttpResponse.ok(
      { id: updatedOrderId },
      'Order updated successfully',
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Order deleted successfully' })
  async delete(@Param('id') order_id: string): Promise<void> {
    await this.orderUseCase.delete(order_id);
  }
}
