import { Module } from '@nestjs/common';
import { OrderUseCase } from './application/useCase/OrderUseCase';
import { InjectionToken } from './application/InjectToken';
import { OrderController } from './infra/controllers/OrderController';
import { InMemoryOrderRepository } from './infra/repository/in-memory/InMemoryOrderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderModel } from './infra/models/Orders';
import { TypeOrmOrderRepository } from './infra/repository/OrderRepositoryImpl';
import { OrderProducer } from './infra/kafka/KafkaOrderProducer';
import { KafkaModule } from './infra/kafka/KafkaModule';
import { ElasticSearchModule } from './infra/elasticsearch/ElasticSearchModule';
import { OrderSearchService } from './infra/elasticsearch/OrderSearch';
import { AppLogger } from 'src/log/Logger';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderModel]),
    KafkaModule,
    ElasticSearchModule,
  ],
  providers: [
    OrderUseCase,
    OrderProducer,
    OrderController,
    OrderSearchService,
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
    {
      provide: InjectionToken.ORDER_ELASTIC_SEARCH,
      useClass: OrderSearchService,
    },
    {
      provide: InjectionToken.LOGGER,
      useClass: AppLogger,
    },
  ],
  controllers: [OrderController],
  exports: [OrderProducer, OrderSearchService],
})
export class OrderModule {}
