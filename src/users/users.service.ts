import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  getAllUsuarios() {
    return this.usuarioRepository.find();
  }

  createUsuario(createUsuarioDto: CreateUserDto) {
    const newUsuario = this.usuarioRepository.create(createUsuarioDto);
    return this.usuarioRepository.save(newUsuario);
  }

  async updateUsuario(id: number, updateUsuarioDto: UpdateUserDto) {
    await this.usuarioRepository.update(id, updateUsuarioDto);
    return this.usuarioRepository.findOne({ where: { id } });
  }  

  async deleteUsuario(id: number) {
    return this.usuarioRepository.delete(id);
  }
}

