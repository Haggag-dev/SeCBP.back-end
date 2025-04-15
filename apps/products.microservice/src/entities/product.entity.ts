import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '255', nullable: false })
  name: string;

  // Round to two decimal places.
  @Column('decimal', { precision: 10, scale: 2, nullable: false })
  price: number;

  // This a default placeholder for the prototype.
  @Column({
    type: 'varchar',
    length: '255',
    default: 'https://images.unsplash.com/photo-1649182785115-eb5bd1c4cd45?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  })
  imageUrl: string;

  @Column({ type: 'int', default: 300 }) // This is a default stock value for testing the prototype.
  stock: number;
}
