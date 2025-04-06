import { Module } from '@nestjs/common';
import { kafkaProviders } from './KafkaProvider';
import { OrderConsumer } from './KafkaOrderConsumer';

@Module({
  providers: [...kafkaProviders, OrderConsumer],
  exports: [...kafkaProviders],
})
export class KafkaModule {}
