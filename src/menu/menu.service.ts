import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { Menu } from './menu.interface';
const BASE_URL = 'http://localhost:3031/menu/';
@Injectable()
export class MenuService {
  getMenuByValoracion(valoracion: string): Promise<Menu[]> {
    throw new Error('Method not implemented.');
  }
  async getMenuById(id: number): Promise<Menu> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    if (!Object.keys(parsed).length) throw new NotFoundException(`Usuario con id ${id} no existe`);

    return parsed;
  }

  async getMenu(): Promise<Menu[]> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new BadRequestException("Fallo el fetch")
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
  async deleteMenu(id: number): Promise<void> {
    const comprobacion = await this.getMenu();
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Hubo un problema al borrar el menu');

  }
  async updateMenuById(id: number, body: Menu): Promise<Menu> {
    const isMenu = await this.getMenuById(id);
    const updatedMenu = {
      id: body.id,
      title: body.title,
      category: body.category,
      img: body.img,
      description: body.description,
      ingredients: body.ingredients,
      price: body.price,
      valoration: body.valoration,
      tipo: body.tipo
    };
    const res = await fetch(BASE_URL + id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedMenu),
    });
    const parsed = await res.json();
    return parsed;
  }
  private async setId(): Promise<number> {
    const menu = await this.getMenu();
    const id = menu.pop().id + 1;
    return id;
  }


}
