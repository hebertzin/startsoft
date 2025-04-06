import { Provider } from '@nestjs/common';
import { Kafka } from 'kafkajs';

export const kafkaProviders: Provider[] = [
  {
    provide: 'KAFKA_CLIENT',
    useFactory: () => {
      return new Kafka({
        clientId: 'my-app',
        brokers: ['localhost:9092'],
      });
    },
  },
  {
    provide: 'KAFKA_PRODUCER',
    useFactory: async (kafka: Kafka) => {
      const producer = kafka.producer();
      await producer.connect();
      return producer;
    },
    inject: ['KAFKA_CLIENT'],
  },
];
