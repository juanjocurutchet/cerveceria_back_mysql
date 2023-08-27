import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MenuService } from './menu.service';
import { Menu } from './menu.interface';

@Controller('menu')
export class MenuController {
    constructor(private readonly menuService: MenuService){}
}
