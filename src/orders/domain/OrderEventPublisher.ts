export interface OrderEventPublisher {
  publishOrderCreated(data: any): Promise<void>;
  publishOrderUpdated(data: any): Promise<void>;
}
