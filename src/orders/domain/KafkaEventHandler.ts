export interface KafkaEventHandler {
  topic: string;
  handle(message: any): Promise<void>;
}
