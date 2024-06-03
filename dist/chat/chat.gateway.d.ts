import { OnModuleInit } from "@nestjs/common";
import { Socket, Server } from "socket.io";
export declare class ChatGateway implements OnModuleInit {
    JWT_SECRET: string;
    server: Server;
    private connectedClients;
    onModuleInit(): void;
    onNewMessage(body: any, socket: Socket): void;
    private handleConnection;
    validateToken(token: string): boolean;
}
