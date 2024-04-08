import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';



@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  getAllMenu() {
    return this.menuService.getAllMenu();
  }

  @Get('search/:category')
  getMenuByCategory(@Param('category') category: string) {
    return this.menuService.getMenuByCategory(category);
  }

  @Get('search/:ingredientes')
  searchMenuByIngredient(@Param('ingredientes') ingredientes: string) {
    return this.menuService.searchMenuByIngredient(ingredientes);
  }

  @Post()
  createMenu(@Body() createMenu: CreateMenuDto) {
    return this.menuService.createMenu(createMenu);
  }

  @Put(':id')
  updateMenu(@Param('id') id: number, @Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.updateMenu(id, updateMenuDto);
  }

  @Delete(':id')
  deleteMenu(@Param('id') id: number) {
    return this.menuService.deleteMenu(id);
  }
}
