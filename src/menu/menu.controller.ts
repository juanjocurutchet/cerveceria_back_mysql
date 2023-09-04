import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.interface';

@Controller('menu/')
export class MenuController {
  constructor(private readonly menuService: MenuService) { }
  @Get('/:id')
  getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }
  @Get()
  
  getMenu(@Query('title') title?: string,
          @Query('category') category?: string,
          ): Promise<Menu[]> {
    if (title) return this.menuService.getMenuByTitle(title);
    if (category) return this.menuService.getMenuByCategory(category); 

    return this.menuService.getMenu()
  }
  getMenuSearh(@Query() query: any): Promise<Menu[]> {
    return this.menuService.getMenuSearch(query);
  }


  @Post()
  createMenu(@Body() body): Promise<Menu> {
    return this.menuService.createMenu(body);
  }
}
