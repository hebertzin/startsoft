import { OrderItem, Status } from 'src/orders/domain/Order';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: Status, default: Status.PENDING })
  status: Status;

  @Column({ type: 'json', nullable: true })
  items: {
    productId: string;
    quantity: number;
    price: number;
    name?: string;
  }[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
