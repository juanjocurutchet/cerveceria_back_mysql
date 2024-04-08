import { OpcionMenu } from 'src/menu/menu.entity';
import { Usuario } from 'src/users/users.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class Compra {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Usuario, usuario => usuario.compras)
  @JoinColumn({ name: 'usuario_id' })
  usuario: Usuario;

  @ManyToOne(() => OpcionMenu)
  @JoinColumn({ name: 'opcion_menu_id' })
  opcionMenu: OpcionMenu;

  @Column()
  fecha: Date;

  @Column()
  cantidad: number;
}