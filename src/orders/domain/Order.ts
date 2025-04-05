enum Status {
  PENDING = 'pending',
  PROCESSING = 'processing',
  SHIPPED = 'shipped',
  DELIVERED = 'delivered',
  CANCELELED = 'cancelled',
}

export type OrderItem = {
  name: string;
  productId: string;
  quantity: number;
  price: number;
};

export type Order = {
  id: string;
  items: OrderItem[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};


export type OrderEssentialProperties = Readonly<
  Required<{
    id: string
    status: Status;
    items: OrderItem[]
  }>
>;

export type OrderOptionalProperties = Readonly<
  Partial<{
    createdAt: Date;
    updatedAt: Date;
  }>
>;

export type OrderProperties = OrderEssentialProperties &
  Required<OrderEssentialProperties>;

