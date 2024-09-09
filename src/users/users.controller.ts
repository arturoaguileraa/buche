import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // Ruta para obtener todos los usuarios
  @Get()
  findAllUsers(): Promise<User[]> {
    return this.userService.findAllUsers();
  }

  @Get('waiters-without-establishment')
  async getWaitersWithoutEstablishment() {
    return this.userService.findWaitersWithoutEstablishment();
  }

  // Ruta para obtener un usuario por ID
  @Get(':id')
  findUserById(@Param('id') id: number): Promise<User> {
    return this.userService.findOneById(id);
  }

  // Ruta para crear un nuevo usuario
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  // Ruta para actualizar un usuario por ID
  @Patch(':id')
  async updateUser(
    @Param('id') id: number, 
    @Body() updateUserDto: Partial<CreateUserDto>
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  // Ruta para eliminar un usuario por ID
  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.userService.delete(id);
  }

}
