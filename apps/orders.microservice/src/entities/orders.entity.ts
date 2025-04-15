import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  REJECTED = 'rejected',
  CANCELED = 'canceled',
  CONFIRMED = 'confirmed',
  DELIVERED = 'delivered',
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  order_id: number;

  @Column({ nullable: false })
  user_id: number;

  @Column({ nullable: false })
  product_id: number;

  @Column({ type: 'varchar', length: '255', nullable: true })
  product_name: string;

  // Round to two decimal places.
  @Column('decimal', { precision: 10, scale: 2, nullable: true })
  product_price: number;

  @Column({ type: 'enum', enum: OrderStatus, nullable: false })
  status: OrderStatus;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
