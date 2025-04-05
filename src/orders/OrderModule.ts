import { Module } from '@nestjs/common';
import { OrderUseCase } from './application/useCase/OrderUseCase';
import { InjectionToken } from './application/InjectToken';
import { OrderController } from './infra/controllers/OrderController';
import { InMemoryOrderRepository } from './infra/repository/in-memory/InMemoryOrderRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './infra/models/Orders';

@Module({
    imports: [TypeOrmModule.forFeature([Order])],
    providers: [
        OrderUseCase,
        {
            provide: InjectionToken.ORDERS_REPOSITORY,
            useClass: InMemoryOrderRepository,
        },
    ],
    controllers: [OrderController],
})
export class OrderModule { }
