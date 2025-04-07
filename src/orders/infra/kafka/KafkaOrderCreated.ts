import { Injectable } from '@nestjs/common';
import { KafkaEventHandler } from 'src/orders/domain/KafkaEventHandler';

@Injectable()
export class OrderCreatedHandler implements KafkaEventHandler {
  topic = 'order_created';

  async handle(message: any) {
    console.log('[Kafka][order_created] =>', message);
  }
}
