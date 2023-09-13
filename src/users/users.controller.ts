import { Body, Controller, Get, Param, Post, HttpCode, Query, Delete,Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { Users } from './users.interface';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }
    @Get('/:id')
    getUserById(@Param('id') id: number): Promise<Users> {
        return this.userService.getUserById(id)
    }
    @Get()
    getUsers(
        @Query('user') user?: string
    ): Promise<any> {
        if (user) return this.userService.getUsersByUser(user);
        return this.userService.getUsers();
    }
    @Post()
    createUser(@Body() body): Promise<any> {
        return this.userService.createUser(body);
    }
    @Delete('/:id')
    @HttpCode(204)
    deleteUser(@Param('id') id: number): Promise<void> {
        return this.userService.deleteUser(id);
    }
    @Put('/:id')
    updateUserById(@Param('id') id: number, @Body() body: Users): Promise<Users> {
        return this.userService.updateUserById(id, body);
    }



}
