import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserDto } from './user.dto';
import { MenuDto } from 'src/menu/menu.dto';
const BASE_URL = 'http://localhost:3031/users/';
@Injectable()
export class UsersService {
    async getUserById(id: number): Promise<any> {
        const res = await fetch(BASE_URL + id);
        const parsed = await res.json();
        if (!Object.keys(parsed).length) throw new NotFoundException(`Usuario con id ${id} no existe`);
        return parsed;
    }

    async getUsers(): Promise<any> {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new BadRequestException("Fallo el fetch")
        const parsed = await res.json();
        return parsed;
    }

    async getUsersByUser(userActual: string): Promise<any> {
        const res = await this.getUsers();
        const parsed = res.find((user) => user.user === userActual);
        if (!parsed) throw new NotFoundException({ message: `No existe el usuario ${userActual}` })
        return parsed;
    }

    async createUser(userActual: UserDto): Promise<UserDto> {
        const id = await this.setId();
        const { name, lastName, user, email, password, age } = userActual;
        const newUser = { id, name, lastName, user, email, password, age };
        const res = await fetch(BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        });
        const parsed = res.json();
        return parsed;
    }

    async deleteUser(id: number): Promise<void> {
        const comprobacion = await this.getUserById(id);
        const res = await fetch(BASE_URL + id, {
            method: 'DELETE',
        });
        if (!res.ok) throw new Error('Hubo un problema al borrar el usuario');
    }

    private async setId(): Promise<number> {
        const users = await this.getUsers();
        const id = users.pop().id + 1;
        return id;
    }   

    async updateUserById(id: number, userDto: UserDto): Promise<any> {
        const isUser = await this.getUserById(id);
                  const updatedUser = {            
                name: userDto.name,
                lastName: userDto.lastName,
                user: userDto.user,
                password: userDto.password,
                age: userDto.age,            
            };
            
            const res = await fetch(BASE_URL + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            });
            const parsed = await res.json();
            return parsed;
        }
   
}
