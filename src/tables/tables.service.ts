import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from './entities/table.entity';
import { CreateTableDto } from './dto/create-table.dto';
import { UpdateTableDto } from './dto/update-table.dto';
import { User } from 'src/users/entities/user.entity';
import { Establishment } from 'src/establishments/entities/establishment.entity';

@Injectable()
export class TablesService {
    constructor(
        @InjectRepository(Table)
        private tableRepository: Repository<Table>,

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,

        @InjectRepository(Establishment) 
        private establishmentRepository: Repository<Establishment>,
    ) {}

    async create(createTableDto: CreateTableDto): Promise<Table> {
        const { establishmentId } = createTableDto;
      
        const establishment = await this.establishmentRepository.findOne({
          where: { id: establishmentId },
        });
      
        if (!establishment) {
          throw new NotFoundException('Establishment not found');
        }
      
        // Obtener todos los números de mesa existentes para este establecimiento
        const existingTables = await this.tableRepository.find({
          where: { establishment: { id: establishmentId } },
          order: { number: 'ASC' },
        });
      
        // Encontrar el primer número de mesa disponible
        let newTableNumber = 1;
        for (const table of existingTables) {
          if (table.number !== newTableNumber) {
            break;
          }
          newTableNumber++;
        }
      
        const table = this.tableRepository.create({
          establishment,
          number: newTableNumber,
          status: 'available', // Establecer el status por defecto
        });
      
        return this.tableRepository.save(table);
      }

    async findOne(establishmentId: number, number: number): Promise<Table> {
    const table = await this.tableRepository.findOne({
        where: { establishmentId, number },
        relations: ['orders', 'user'],
    });

    if (!table) {
        throw new NotFoundException('Table not found');
    }

    return table;
    }

    async update(
        establishmentId: number, 
        number: number, 
        updateTableDto: UpdateTableDto
      ): Promise<Table> {
        // Extraer el userId del DTO si está presente
        const { userId, ...restUpdateDto } = updateTableDto;
      
        // Si se proporcionó un userId, buscar el usuario
        let user: User | null = null;
        if (userId) {
          user = await this.userRepository.findOne({where : { id : userId}});
          if (!user) {
            throw new NotFoundException(`User with id ${userId} not found`);
          }
        }
      
        // Actualizar la mesa con los datos proporcionados y el usuario si está presente
        await this.tableRepository.update(
          { establishmentId, number }, 
          { ...restUpdateDto, user }
        );
      
        return this.findOne(establishmentId, number); // Devuelve la mesa actualizada
      }
      


    findAllByEstablishment(establishmentId: number): Promise<Table[]> {
        return this.tableRepository.find({
          where: { establishment: { id: establishmentId } },
          relations: ['orders', 'user'], // Si deseas incluir las órdenes relacionadas
          order: { number: 'ASC' },
        });
    }

    async remove(establishmentId: number, number: number): Promise<void> {
        const result = await this.tableRepository.delete({ establishment: { id: establishmentId }, number });
        if (result.affected === 0) {
          throw new NotFoundException('Table not found');
        }
      }
      

}
