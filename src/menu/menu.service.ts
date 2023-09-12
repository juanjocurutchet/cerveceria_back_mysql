import { Injectable } from '@nestjs/common';
import { Menu } from './menu.interface';
import { NotFoundException } from '@nestjs/common/exceptions';
const BASE_URL = 'http://localhost:3031/menu/';
@Injectable()
export class MenuService {
  getMenuByValoracion(valoracion: string): Promise<Menu[]> {
    throw new Error('Method not implemented.');
  }
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

    if (query.ingredients) {
      results = results.filter((menu) =>
        menu.ingredients.toUpperCase().includes(query.ingredients.toUpperCase())
      );
    }

    if (query.price) {
      results = results.filter((menu) => Number(menu.price) === Number(query.price));
    }

    if (query.description) {
      results = results.filter((menu) =>
        menu.description.toUpperCase().includes(query.description.toUpperCase())
      );
    }

    if (query.tipo) {
      results = results.filter((menu) =>
        menu.tipo.toUpperCase().includes(query.tipo.toUpperCase())
      );
    }

    if (query.valoration) {
      results = results.filter((menu) => Number(menu.valoration) === Number(query.valoration));
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
