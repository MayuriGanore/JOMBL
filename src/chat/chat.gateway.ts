/* eslint-disable prettier/prettier */
import { OnModuleInit } from "@nestjs/common";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket, Server } from "socket.io";
import * as jwt from 'jsonwebtoken';

@WebSocketGateway()
export class ChatGateway implements OnModuleInit {
    JWT_SECRET = "MayuriGanore@24//";
    @WebSocketServer()
    server: Server;

    // Map to store connected clients
    private connectedClients: Map<string, Socket> = new Map();

    onModuleInit() {
        this.server.on('connection', (socket: Socket) => {
            this.handleConnection(socket);
            console.log(socket.id);
            console.log("Connected");
            this.connectedClients.set(socket.id, socket);
        });
    }

    @SubscribeMessage("newMessage")
    onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket: Socket) {
        console.log(body);
        
        // Emit the message to all connected clients except the sender
        this.connectedClients.forEach((clientSocket, clientId) => {
            if (clientId !== socket.id) {
                clientSocket.emit('onMessage', {
                    msg: 'New Message',
                    content: body,
                });
            }
        });
    }

    private handleConnection(socket: Socket): void {
        const token = Array.isArray(socket.handshake.query.token) ? socket.handshake.query.token[0] : socket.handshake.query.token;
        if (!this.validateToken(token)) {
            console.log(`Unauthorized connection attempt`);
            socket.disconnect(true);
        } else {
            console.log(`Connected Successfully!!`);
        }
    }

    validateToken(token: string): boolean {
        try {
            jwt.verify(token, this.JWT_SECRET);
            return true;
        } catch (error) {
            return false;
        }
    }
}
