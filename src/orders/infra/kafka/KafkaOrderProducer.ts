import { Inject, Injectable } from "@nestjs/common";
import { Producer } from "kafkajs";
import { OrderEventPublisher } from "src/orders/domain/OrderEventPublisher";

@Injectable()
export class OrderProducer implements OrderEventPublisher {
  constructor(@Inject('KAFKA_PRODUCER') private readonly kafkaProducer: Producer) {}

  async publishOrderCreated(data: any): Promise<void> {

    console.log("passando aqui no publishOrderCreated")
    await this.kafkaProducer.send({
      topic: 'order_created',
      messages: [{ value: JSON.stringify(data) }],
    });
  }

  async publishOrderStatusUpdated(data: any): Promise<void> {
    await this.kafkaProducer.send({
      topic: 'order_status_updated',
      messages: [{ value: JSON.stringify(data) }],
    });
  }
}
