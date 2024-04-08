import { IsDate, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCompraDto {
  @IsDate()
  @IsNotEmpty()
  fecha: Date;

  @IsNumber()
  @IsNotEmpty()
  cantidad: number;
}