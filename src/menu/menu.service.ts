import { Injectable } from '@nestjs/common';
import { Menu } from './menu.interface';
const BASE_URL = "http://localhost:3031/menu/"
@Injectable()
export class MenuService {
    async getMenuById(id:number):Promise<Menu>{
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        return parsed;
    }
}
