import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateMenuDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    category: string;
    
    @IsString()
    image: string;

    @IsString()
    @IsNotEmpty()
    description: string;
    
    @IsString()
    @IsNotEmpty()
    ingredientes: string;

    @IsNumber()
    @IsNotEmpty()
    price: string;

    @IsNumber()
    valoration: string;

    @IsString()
    tipo: string;
}