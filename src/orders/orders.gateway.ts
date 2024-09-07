// orders.gateway.ts
import {
    WebSocketGateway,
    WebSocketServer,
    SubscribeMessage,
    MessageBody,
  } from '@nestjs/websockets';
  import { Server } from 'socket.io';
import { Order } from './entities/order.entity';
  
@WebSocketGateway({
    cors: {
      origin: 'http://localhost:3000', // Permitir el frontend
      methods: ['GET', 'POST'], // Los métodos permitidos
      credentials: true, // Si necesitas autenticación o cookies
    },
  })
  export class OrdersGateway {
    @WebSocketServer() server: Server;
  
    // Método para emitir un evento cuando se crea o actualiza un pedido
    emitOrderUpdate(order: Order) {
      this.server.emit('orderUpdate', order);
    }
  
    @SubscribeMessage('newOrder')
    handleNewOrder(@MessageBody() order: Order) {
      this.server.emit('orderUpdate', order);
    }
  }
  