import { Injectable } from '@nestjs/common';
import { KafkaEventHandler } from 'src/orders/domain/KafkaEventHandler';

@Injectable()
export class OrderUpdatedHandler implements KafkaEventHandler {
  topic = 'order_status_updated';

  async handle(message: any) {
    console.log('[Kafka][order_status_updated] =>', message);
  }
}