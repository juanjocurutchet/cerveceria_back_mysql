import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class UpdateMenuDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  category?: string;
  
  @IsString()
  @IsOptional()
  img?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  description?: string;
  
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  ingredients?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  price?: number;

  @IsString()
  @IsOptional()
  valoration?: number;

  @IsString()
  @IsOptional()
  tipo?: string;
}

