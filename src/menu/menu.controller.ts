import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  HttpCode,
  Put
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.interface';

@Controller('menu/')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get('/:id')
  getMenuById(@Param('id') id: number): Promise<Menu> {
    return this.menuService.getMenuById(id);
  }
  @Get()
  getMenuSearh(@Query() query: any): Promise<Menu[]> {
    return this.menuService.getMenuSearch(query);
  }

  @Post()
  createMenu(@Body() body): Promise<Menu> {
    return this.menuService.createMenu(body);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteMenu(@Param('id') id: number): Promise<void> {
    return this.menuService.deleteMenu(id);
  }

  @Put('/:id')
updateMenuById(@Param('id') id: number, @Body() body: Menu): Promise<Menu> {
return this.menuService.updateMenuById(id, body);
}
}
