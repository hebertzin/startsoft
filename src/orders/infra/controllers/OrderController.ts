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
  ApiOkResponse,
  ApiBadRequestResponse,
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
  ) { }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new order' })
  @ApiBody({ type: OrderDTO })
  @ApiOkResponse({
    description:
      'Create a new order',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  public async save(
    @Body() createOrderDTO: OrderDTO,
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<Response> {
    const orderId = await this.orderUseCase.save(createOrderDTO);
    return res.status(HttpStatus.CREATED).json({
      message: 'Order Create Successfully!',
      status: HttpStatus.CREATED,
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
  @ApiOkResponse({
    description:
      'Find all orders',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  public async findAll(
    @Req() req: Request,
    @Res() res: Response
  ) {
    const orders = await this.orderUseCase.findAll();
    return res.status(HttpStatus.OK).json({
      message: 'Orders found Successfully!',
      status: HttpStatus.OK,
      data: {
        orders
      },
      metadata: {
        requestId: req['requestId'],
        timestamp: req['timestamp'],
      },
    });
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
  @ApiOkResponse({
    description:
      'Find an order by id',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  public async findById(
    @Req() req: Request,
    @Res() res: Response,
    @Param('id') order_id: string
  ): Promise<Response> {
    const order = await this.orderUseCase.findById(order_id)
    return res.status(HttpStatus.OK).json({
      message: 'Order found Successfully!',
      status: HttpStatus.OK,
      data: {
        order
      },
      metadata: {
        requestId: req['requestId'],
        timestamp: req['timestamp'],
      },
    })
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Update an order' })
  @ApiParam({ name: 'id', type: String })
  @ApiOkResponse({
    description:
      'Update an order by id',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  public async update(
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
  @ApiOkResponse({
    description:
      'Delete an order by id',
  })
  @ApiBadRequestResponse({ description: 'Bad request' })
  public async delete(
    @Res() res: Response,
    @Param('id') order_id: string
  ): Promise<Response> {
    await this.orderUseCase.delete(order_id);
    return res.status(HttpStatus.NO_CONTENT)
  }
}
