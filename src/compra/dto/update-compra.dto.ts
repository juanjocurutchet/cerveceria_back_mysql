import { IsDate, IsNumber, IsOptional } from 'class-validator';

export class UpdateCompraDto {
  @IsDate()
  @IsOptional()
  fecha?: Date;

  @IsNumber()
  @IsOptional()
  cantidad?: number;
}
