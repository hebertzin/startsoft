import { Module } from '@nestjs/common';
import { OrderUseCase } from './application/useCase/OrderUseCase';
import { InMemoryOrderRepository } from './infra/repository/in-memory/InMemoryRepository';
import { InjectionToken } from './application/InjectToken';
import { OrderController } from './infra/controllers/OrderController';

@Module({
  providers: [
    OrderUseCase,
    {
      provide: InjectionToken.ORDERS_REPOSITORY,
      useClass: InMemoryOrderRepository,
    },
  ],
  controllers: [OrderController],
})
export class OrderModule {}
