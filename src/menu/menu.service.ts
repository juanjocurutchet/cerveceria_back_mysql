import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { MenuDto } from './menu.dto';
const BASE_URL = 'http://localhost:3031/menu/';
@Injectable()
export class MenuService {
  //get by id
  async getMenuById(id: number): Promise<any> {
    const res = await fetch(BASE_URL + id);
    const parsed = await res.json();
    if (!Object.keys(parsed).length) throw new NotFoundException(`Menu con id ${id} no existe`);

    return parsed;
  }

  //get all
  async getMenu(): Promise<any> {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new BadRequestException("Fallo el fetch")
    const parsed = await res.json();

    return parsed;
  }

  //get by query
  async getMenuSearch(query: any): Promise<MenuDto[]> {
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

  //create
  async createMenu(menu: MenuDto): Promise<MenuDto> {
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

  //delete
  async deleteMenu(id: number): Promise<void> {
    const comprobacion = await  this.getMenuById(id);
    const res = await fetch(BASE_URL + id, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Hubo un problema al borrar el menu');

  }

  //update by id
  async updateMenuById(id: number, body: MenuDto): Promise<any> {
    const isMenu = await this.getMenuById(id);
    const updatedMenu = {      
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
