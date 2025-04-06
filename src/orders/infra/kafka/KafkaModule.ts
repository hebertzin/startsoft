import { Module } from '@nestjs/common';
import { KafkaConsumer } from './KafkaOrderConsumer';
import { OrderCreatedHandler } from './KafkaOrderCreated';
import { OrderUpdatedHandler } from './KafkaOrderUpdated';
import { KafkaEventHandler } from 'src/orders/domain/KafkaEventHandler';
import { kafkaProviders } from './KafkaProvider';

@Module({
  providers: [
    ...kafkaProviders,
    KafkaConsumer,
    OrderCreatedHandler,
    OrderUpdatedHandler,
    {
      provide: 'KafkaEventHandler[]',
      useFactory: (
        orderCreated: OrderCreatedHandler,
        orderUpdated: OrderUpdatedHandler,
      ) => [orderCreated, orderUpdated],
      inject: [OrderCreatedHandler, OrderUpdatedHandler],
    },
    {
      provide: KafkaConsumer,
      useFactory: (handlers: KafkaEventHandler[]) =>
        new KafkaConsumer(handlers),
      inject: ['KafkaEventHandler[]'],
    },
  ],
  exports: ['KAFKA_PRODUCER'],
})
export class KafkaModule {}
