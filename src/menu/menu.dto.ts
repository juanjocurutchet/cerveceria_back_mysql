import { IsString} from 'class-validator';

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
    @IsString()
    price: string;
    @IsString()
    valoration: string;
    @IsString()
    tipo: string;
}
