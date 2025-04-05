enum Status {
    PENDING = "pending",
    PROCESSING = "processing",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELELED = "cancelled"
}

type OrderItem = {
    name: string;
    productId: string;
    quantity: number;
    price: number
};

type Order = {
    id: string
    items: OrderItem[]
    status: Status
    createdAt: Date;
    updatedAt: Date;
}