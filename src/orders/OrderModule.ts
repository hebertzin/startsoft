import { Module } from '@nestjs/common';
import { OrderUseCase } from './application/useCase/OrderUseCase';
import { InjectionToken } from './application/InjectToken';
import { OrderController } from './infra/controllers/OrderController';
import { InMemoryOrderRepository } from './infra/repository/in-memory/InMemoryOrderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './infra/models/Orders';
import { TypeOrmOrderRepository } from './infra/repository/OrderRepositoryImpl';
import { OrderProducer } from './infra/kafka/KafkaOrderProducer';
import { KafkaModule } from './infra/kafka/KafkaModule';

// here are concrete implementations
@Module({
  imports: [TypeOrmModule.forFeature([Order]), KafkaModule],
  providers: [
    OrderUseCase,
    OrderProducer,
    OrderController,
    {
      provide: InjectionToken.ORDERS_REPOSITORY,
      useClass: TypeOrmOrderRepository,
    },
    {
      provide: InjectionToken.ORDER_EVENT_PUBLISHER,
      useClass: OrderProducer,
    },
    {
      provide: InjectionToken.ORDERS_USE_CASE,
      useClass: OrderUseCase,
    },
  ],
  controllers: [OrderController],
  exports: [OrderProducer],
})
export class OrderModule {}
