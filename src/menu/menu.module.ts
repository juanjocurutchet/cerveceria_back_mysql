import { Module } from '@nestjs/common';
import { MenuController } from './menu.controller';
import { MenuService } from './menu.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OpcionMenu } from './menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OpcionMenu])],
  controllers: [MenuController],
  providers: [MenuService]
})
export class MenuModule {}
