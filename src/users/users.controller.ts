import { Controller, Get, Param, Post, Body } from '@nestjs/common';
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
}
