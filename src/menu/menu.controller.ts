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
  getMenuSearh(@Query() query: any): Promise<Menu[]> {
    console.log("hola");
    
    return this.menuService.getMenuSearch(query);
  }
  getMenu(@Query('title') title?: string, @Query('ingredients') ingredients?:string): Promise<Menu[]> {
    if (ingredients) return this.menuService.getMenuByIngredients(ingredients);
    if (title) return this.menuService.getMenuByTitle(title);
    console.log("soy getMenu");
    
  
    return this.menuService.getMenu()
  }


  @Post()
  createMenu(@Body() body): Promise<Menu> {
    return this.menuService.createMenu(body);
  }
}
