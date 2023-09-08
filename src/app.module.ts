import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MenuModule } from './menu/menu.module';

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }), MenuModule,],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
