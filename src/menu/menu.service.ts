import { Injectable } from '@nestjs/common';
import { Menu } from './menu.interface';
const BASE_URL = 'http://localhost:3031/menu/';
@Injectable()
export class MenuService {
  async getMenuById(id: number): Promise<Menu> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    return parsed;
  }

  async getMenu(): Promise<Menu[]> {
    const res = await fetch(BASE_URL);
    const parsed = await res.json();
    return parsed;
  }

  async createMenu(menu: Menu): Promise<Menu> {
    const id = await this.setId();
    const newMenu = { ...menu, id };
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newMenu),
    });
    const parsed = res.json();
    return parsed;
  }

      private async setId(): Promise<number>{
        const menu=await this.getMenu();
        const id = menu.pop().id + 1;
        return id;
    }
}
