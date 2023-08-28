import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
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
}
