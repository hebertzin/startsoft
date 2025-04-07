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
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { CreateOrderDTO } from '../dto/CreateOrderDTO';
import { Order } from '../models/Orders';
import { OrderUseCase } from 'src/orders/domain/OrderUseCase';
import { InjectionToken } from 'src/orders/application/InjectToken';
import { OrderData } from 'src/orders/domain/Order';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(InjectionToken.ORDERS_USE_CASE)
    private readonly orderUseCase: OrderUseCase,
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: CreateOrderDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created successfully',
    type: CreateOrderDTO
  })
  async create(
    @Body() input: CreateOrderDTO
  ): Promise<string> {
    return await this.orderUseCase.save(input);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Orders found successfully',
    type: Order,
  })
  async findAll() : Promise<Order[]> {
    return await this.orderUseCase.findAll();
  }

  @Get('filter')
  async filterOrders(
    @Query('id') id?: string,
    @Query('status') status?: string,
    @Query('start') start?: string,
    @Query('end') end?: string,
    @Query('item') item?: string,
  ) {
    return await this.orderUseCase.filterOrders({
      id,
      status,
      start,
      end,
      item,
    });
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get order by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    type: Order,
    description: 'Order found successfully',
  })
  async findById(
    @Param('id') order_id: string): Promise<Order | null> {
    return await this.orderUseCase.findById(order_id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ 
    status: HttpStatus.OK, 
    description: 'Order updated successfully' 
  })
  async update(
    @Param('id') order_id: string, 
    @Body() updateOrderDto: any
  ) :Promise<string> {
    return await this.orderUseCase.update(
      order_id,
      updateOrderDto,
    )
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: HttpStatus.NO_CONTENT, description: 'Order deleted successfully' })
  async delete(@Param('id') order_id: string): Promise<void> {
    await this.orderUseCase.delete(order_id);
  }
}
