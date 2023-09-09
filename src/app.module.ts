import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { MenuModule } from './menu/menu.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'client') }), MenuModule, UsersModule,],
  controllers: [],
  providers: [ ],
})
export class AppModule {}
