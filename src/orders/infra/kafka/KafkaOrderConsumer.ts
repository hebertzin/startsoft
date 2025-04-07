import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { Kafka, EachMessagePayload } from 'kafkajs';
import { KafkaEventHandler } from 'src/orders/domain/KafkaEventHandler';
@Injectable()
export class KafkaConsumer implements OnModuleInit {
  private readonly logger = new Logger(KafkaConsumer.name);

  constructor(private readonly handlers: KafkaEventHandler[]) {}

  async onModuleInit() {
    const kafka = new Kafka({ brokers: ['localhost:9092'] });
    const consumer = kafka.consumer({ groupId: 'order-service-group' });

    await consumer.connect();

    for (const handler of this.handlers) {
      await consumer.subscribe({ topic: handler.topic, fromBeginning: true });
      this.logger.log(`Subscribed to topic: ${handler.topic}`);
    }

    await consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        const payload = JSON.parse(message.value?.toString() || '{}');
        const handler = this.handlers.find((h) => h.topic === topic);

        if (handler) {
          await handler.handle(payload);
        } else {
          this.logger.warn(`No handler found for topic: ${topic}`);
        }
      },
    });
  }
}
