import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.interface';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get('/:id')
  getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }
  @Get()
  getMenu(): Promise<Menu[]> {
    return this.menuService.getMenu();
  }

  @Post()
  createMenu(@Body() body): Promise<Menu> {
    return this.menuService.createMenu(body);
  }
}
