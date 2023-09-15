import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  HttpCode,
  Put,
  ParseIntPipe,
  HttpStatus
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuDto } from './menu.dto';

@Controller('menu/')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}
  @Get('/:id')
  getMenuById(@Param('id', new ParseIntPipe({
    errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE
  })) id: number): Promise<MenuDto> {
    return this.menuService.getMenuById(id);
  }
  @Get()
  getMenuSearh(@Query() query: any): Promise<MenuDto[]> {
    return this.menuService.getMenuSearch(query);
  }

  @Post()
  createMenu(@Body() menuDto: MenuDto): Promise<any> {
    console.log(menuDto);
    
    return this.menuService.createMenu(menuDto);
  }
  @Delete('/:id')
  @HttpCode(204)
  deleteMenu(@Param('id') id: number): Promise<void> {
    return this.menuService.deleteMenu(id);
  }

  @Put('/:id')
updateMenuById(@Param('id') id: number, @Body() menuDto: MenuDto): Promise<any> {
return this.menuService.updateMenuById(id, menuDto);
}
}
