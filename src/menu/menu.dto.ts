import { IsNumber, IsString} from 'class-validator';

export class MenuDto {
    @IsString()
    title: string;
    @IsString()
    category: string;
    @IsString()
    img: string;
    @IsString()
    description: string;
    @IsString()
    ingredients: string;
    @IsNumber()
    price: number;
    @IsNumber()
    valoration: number;
    @IsString()
    tipo: string;
}
