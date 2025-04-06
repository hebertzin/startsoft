import { Injectable, OnModuleInit } from '@nestjs/common';
import { Kafka, EachMessagePayload } from 'kafkajs';

@Injectable()
export class OrderConsumer implements OnModuleInit {
  async onModuleInit() {
    const kafka = new Kafka({ brokers: ['localhost:9092'] });
    const consumer = kafka.consumer({ groupId: 'order-service-group' });
    await consumer.connect();
    await consumer.subscribe({ topic: 'order_created', fromBeginning: true });

    await consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        const data = message.value?.toString();
        console.log(`[Kafka][${topic}] Message recieved:`, data);
      },
    });
  }
}
