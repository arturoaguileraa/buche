import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  async findOne(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
  }
  
  async update(userId: number, updateUserDto: Partial<User>): Promise<User> {
    await this.usersRepository.update(userId, updateUserDto);
    return this.findOneById(userId);
  }
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { id } });
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
}
