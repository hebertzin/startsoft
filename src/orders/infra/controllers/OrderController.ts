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
  Req,
  Res,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

import { OrderUseCase } from 'src/orders/domain/OrderUseCase';
import { InjectionToken } from 'src/orders/application/InjectToken';
import { Request, Response } from 'express';
import { OrderDTO } from '../dto/CreateOrderDTO';
import { Order } from 'src/orders/domain/Order';
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(
    @Inject(InjectionToken.ORDERS_USE_CASE)
    private readonly orderUseCase: OrderUseCase,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: OrderDTO })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Order created successfully',
    type: OrderDTO,
  })
  async save(
    @Body() input: OrderDTO,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const orderId = await this.orderUseCase.save(input);
    return res.status(HttpStatus.CREATED).json({
      data: {
        id: orderId,
      },
      metadata: {
        requestId: req['requestId'],
        timestamp: req['timestamp'],
      },
    });
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Get all orders' })
  @ApiResponse({
    status: 200,
    description: 'Orders found successfully',
    type: Order,
  })
  async findAll() {
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
  async findById(@Param('id') order_id: string): Promise<Order | null> {
    return await this.orderUseCase.findById(order_id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Order updated successfully',
  })
  async update(
    @Param('id') id: string,
    @Body() updateOrderDto: any,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const orderId = await this.orderUseCase.update(id, updateOrderDto);
    return res.status(HttpStatus.OK).json({
      data: {
        id: orderId,
      },
      metadata: {
        requestId: req['requestId'],
        timestamp: req['timestamp'],
      },
    });
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Order deleted successfully',
  })
  async delete(@Param('id') order_id: string): Promise<void> {
    await this.orderUseCase.delete(order_id);
  }
}
