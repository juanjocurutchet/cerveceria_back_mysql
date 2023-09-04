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
  getMenu(@Query('title') title?: string,
          @Query('description') description?: string,
          @Query('tipo') tipo?: string,
          @Query('valoration') valoration?: string,
          ): Promise<Menu[]> {
    if (title) return this.menuService.getMenuByTitle(title);
    if (description) return this.menuService.getMenuByTitle(description);
    if (tipo) return this.menuService.getMenuByTitle(tipo);
    if (valoration) return this.menuService.getMenuByValoracion(valoration);
    console.log("soy getMenu");
    return this.menuService.getMenu()
  }

  @Post()
  createMenu(@Body() body): Promise<Menu> {
    return this.menuService.createMenu(body);
  }
}
