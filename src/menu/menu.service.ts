import { Injectable } from '@nestjs/common';
import { Menu } from './menu.interface';
import { NotFoundException } from '@nestjs/common/exceptions';
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

  async getMenuByTitle(title: string): Promise<Menu[]> {
    const allMenu = await this.getMenu();
    const filterByTitle = allMenu.filter((Menu) => Menu.title.toUpperCase().includes(title.toUpperCase()))
    if (!filterByTitle.length) throw new NotFoundException({ messege: "No hay coincidencias" })
    return filterByTitle;
  }

  async getMenuSearch(query: any): Promise<Menu[]> {
    let results = await this.getMenu();

    if (query.title) {
      results = results.filter((menu) =>
        menu.title.toUpperCase().includes(query.title.toUpperCase())
      );
    }

    if (query.tipo) {
      results = results.filter((menu) =>
        menu.tipo.toUpperCase().includes(query.tipo.toUpperCase())
      );
    }

    if (query.category) {
      results = results.filter((menu) =>
        menu.category.toUpperCase() === query.category.toUpperCase()
      );
    }

    if (results.length === 0) {
      throw new NotFoundException({ message: 'No hay coincidencias' });
    }

    return results;
  }


  async createMenu(menu: Menu): Promise<Menu> {
    const id = await this.setId();
    const { title, category, img, description, ingredients, price, valoration, tipo } = menu
    const newMenu = { id, title, category, img, description, ingredients, price, valoration, tipo };

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

  private async setId(): Promise<number> {
    const menu = await this.getMenu();
    const id = menu.pop().id + 1;
    return id;
  }
}
