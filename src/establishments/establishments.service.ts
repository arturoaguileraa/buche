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
        relations: ['owner'],
        skip: offset,
        take: limit,
    });
  }

  async addWaiter(establishmentId: number, waiterId: number) {
    const establishment = await this.establishmentRepository.findOne({ where: { id: establishmentId } });
    const waiter = await this.userRepository.findOne({ where: { id: waiterId, role: 'WAITER', establishment: null } });
  
    if (!establishment || !waiter) {
      throw new Error('Establishment or Waiter not found');
    }
  
    waiter.establishment = establishment;
    return this.userRepository.save(waiter); // Actualiza el camarero con el establecimiento
  }
  

  async findOne(id: number): Promise<Establishment> {
    return this.establishmentRepository.findOne({ relations: ['owner'], where: { id } });
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
