import { Compra } from 'src/compra/compra.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity()
export class Usuario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  email: string;

  @Column()
  contraseña: string;

  @OneToMany(() => Compra, compra => compra.usuario)
  compras: Compra[];
}