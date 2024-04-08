import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';


@Entity()
export class OpcionMenu {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column(null, { nullable: true })
    image: string;

    @Column()
    description: string;

    @Column()
    ingredientes: string;

    @Column()
    price: number;

    @Column()
    valoration: number;

    @Column()
    tipo: string;
}