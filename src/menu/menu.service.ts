import { Injectable } from '@nestjs/common';
import { Menu } from './menu.interface';
const BASE_URL = "http://localhost:3031/menu/"
@Injectable()
export class MenuService {
    async getMenu(): Promise<Menu[]> {
         const res = await fetch(BASE_URL);
         const parsed = await res.json();
         return parsed;    }
   
}
