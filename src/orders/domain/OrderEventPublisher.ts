export interface OrderEventPublisher {
    publishOrderCreated(data: any): Promise<void>;
    publishOrderStatusUpdated(data: any): Promise<void>;
}