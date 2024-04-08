import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usuarioService: UsersService) {}

  @Get()
  getAllUsuarios() {
    return this.usuarioService.getAllUsuarios();
  }

  @Post()
  createUsuario(@Body() createUsuarioDto: CreateUserDto) {
    return this.usuarioService.createUsuario(createUsuarioDto);
  }

  @Put(':id')
  updateUsuario(@Param('id') id: number, @Body() updateUsuarioDto: UpdateUserDto) {
    return this.usuarioService.updateUsuario(id, updateUsuarioDto);
  }

  @Delete(':id')
  deleteUsuario(@Param('id') id: number) {
    return this.usuarioService.deleteUsuario(id);
  }
}
