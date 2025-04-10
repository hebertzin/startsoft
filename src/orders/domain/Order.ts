import { Status } from './OrderStatus';

export type OrderItem = {
  name: string;
  productId: string;
  quantity: number;
  price: number;
};

export type OrderParams = {
  items: OrderItem[];
};

export class Order {
  constructor(
    readonly id: string,
    private _status: Status,
    private _items: OrderItem[],
    private _createdAt: Date,
    private _updatedAt: Date,
  ) {}

  get status() {
    return this._status;
  }

  get items() {
    return this._items;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  toJSON() {
    return {
      id: this.id,
      status: this._status,
      items: this._items,
      createdAt: this._createdAt,
      updatedAt: this._updatedAt,
    };
  }
}
