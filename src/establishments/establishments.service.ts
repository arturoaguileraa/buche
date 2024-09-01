import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Establishment } from './entities/establishment.entity';
import { User } from '../users/entities/user.entity';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

@Injectable()
export class EstablishmentsService {
  constructor(
    @InjectRepository(Establishment)
    private establishmentRepository: Repository<Establishment>,

    @InjectRepository(User)
    private userRepository: Repository<User>,  // Asegúrate de que esto esté correcto
  ) {}

  async create(createEstablishmentDto: CreateEstablishmentDto, ownerId: number): Promise<Establishment> {
    const owner = await this.userRepository.findOne({ where: { id: ownerId } });
    if (!owner) {
        throw new Error('Owner not found');
    }

    const establishment = this.establishmentRepository.create({
        ...createEstablishmentDto,
        owner,
    });

    await this.establishmentRepository.save(establishment);

    return establishment;
  }

  async findAll(options: { limit: number, offset: number }): Promise<Establishment[]> {
    const { limit, offset } = options;
    return this.establishmentRepository.find({
        skip: offset,
        take: limit,
    });
}

  async findOne(id: number): Promise<Establishment> {
    return this.establishmentRepository.findOne({ where: { id } });
  }

  async update(id: number, updateEstablishmentDto: UpdateEstablishmentDto): Promise<Establishment> {
    await this.establishmentRepository.update(id, updateEstablishmentDto);
    return this.establishmentRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.establishmentRepository.delete(id);
  }

  async findByOwner(ownerId: number): Promise<Establishment[]> {
    return this.establishmentRepository.find({ where: { owner: { id: ownerId } } });
  }
}
