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
    default: 'https://placeholder.com/placeholder.jpg',
  })
  imageUrl: string;

  @Column({ type: 'int', default: 300 }) // This is a default stock value for testing the prototype.
  stock: number;
}
