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
      origin: true, // Permitir cualquier origen
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

    // Escuchar el evento "callWaiter" para llamar al camarero
    @SubscribeMessage('callWaiter')
    handleCallWaiter(@MessageBody() data: any) {
      const { tableId, establishmentId } = data;
      this.server.emit('waiterCalled', { establishmentId, message: `La mesa ${tableId} ha solicitado un camarero.` });
    }
  }
  