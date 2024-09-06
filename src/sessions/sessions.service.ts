// session.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { Table } from '../tables/entities/table.entity';
import { UpdateSessionDto } from './dto/update-session.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SessionService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

// Crear una nueva sesión
async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const { tableNumber, establishmentId, userId, ...sessionData } = createSessionDto;
  
    // Buscar la mesa a la que se le quiere asociar la sesión
    const table = await this.tableRepository.findOne({
      where: { number: tableNumber, establishmentId },
    });
  
    if (!table) {
      throw new NotFoundException('Table not found');
    }
  
    // Buscar el usuario por userId
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });
  
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    // Crear la nueva sesión asociada a la mesa y al usuario
    const newSession = this.sessionRepository.create({
      ...sessionData,
      table,
      user,  // Asociar el usuario a la sesión
    });
  
    return this.sessionRepository.save(newSession);
  }
  

  // Obtener todas las sesiones
  findAll(): Promise<Session[]> {
    return this.sessionRepository.find({ relations: ['orders', 'user', 'table'] });
  }

  // Obtener una sesión por su ID
  findOne(id: number): Promise<Session> {
    return this.sessionRepository.findOne({
      where: { id },
      relations: ['orders', 'user', 'table', 'orders.orderProducts', 'orders.orderProducts.product'],
    });
  }

  // Obtener sesiones activas por mesa y establecimiento
  async findActiveSessions(
    tableNumber: number,
    establishmentId: number,
    isActive: boolean,
  ): Promise<Session[]> {
    return this.sessionRepository.find({
      where: {
        table: { number: tableNumber, establishmentId },
        isActive: isActive,
      },
      relations: ['orders', 'user', 'table'],
    });
  }

  // Actualizar una sesión (ej. marcarla como no activa o añadir endTime)
  async update(id: number, updateSessionDto: UpdateSessionDto): Promise<Session> {
    const session = await this.sessionRepository.findOne({where : { id }});

    if (!session) {
      throw new NotFoundException('Session not found');
    }

    Object.assign(session, updateSessionDto);
    return this.sessionRepository.save(session);
  }

  // Método para encontrar la sesión activa de una mesa y establecimiento
  async findActiveSession(establishmentId: number, tableNumber: number): Promise<Session | null> {
    return this.sessionRepository.findOne({
      where: {
        isActive: true, // Filtrar por sesiones activas
        table: {number : tableNumber, establishmentId},
      },
    });
  }

// Método para buscar las sesiones por userId
async findSessionsByUser(userId: number): Promise<Session[]> {
    
    const userSessions = await this.sessionRepository.find({
      where: { user: { id: userId } }, // Buscamos sesiones asociadas al userId
      relations: ['table', 'orders', 'user'],  // Incluimos las relaciones que sean necesarias
    });
    console.log(userSessions);
    
    return userSessions;
  }
}
