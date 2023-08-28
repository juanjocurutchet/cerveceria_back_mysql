import { Controller, Get,Param, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('/api')
export class AppController {
    @Post()
    createMenu(@Body() body): Promise<Menu>{
        return this.menuService.createMenu(body);
    }
}
