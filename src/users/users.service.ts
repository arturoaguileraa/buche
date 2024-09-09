import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async update(id: number, updateUserDto: Partial<CreateUserDto>): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Actualiza el usuario con los nuevos datos
    Object.assign(user, updateUserDto);
    return this.usersRepository.save(user);
  }
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email }, relations: ['establishment'], });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id }, relations: ['establishment'], });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepository.create(createUserDto);
    return this.usersRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findWaitersWithoutEstablishment() {
    return this.usersRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.establishment', 'establishment')
      .where('user.role = :role', { role: 'WAITER' })
      .andWhere('user.establishmentId IS NULL') // Asegura que el establecimiento sea nulo
      .getMany();
  }
  async delete(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.usersRepository.remove(user);
  }
  
}
