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

@Module({
  imports: [TypeOrmModule.forFeature([Order]), KafkaModule],
  providers: [
    OrderUseCase,
    OrderProducer,
    {
      provide: InjectionToken.ORDERS_REPOSITORY,
      useClass: TypeOrmOrderRepository,
    },
  ],
  controllers: [OrderController],
  exports:[OrderProducer]
})
export class OrderModule {}
