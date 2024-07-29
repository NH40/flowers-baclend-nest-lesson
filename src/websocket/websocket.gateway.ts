import {
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	OnGatewayInit,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer,
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'

@WebSocketGateway()
export class WebSocket
	implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
	@WebSocketServer() server: Server

	afterInit(server: Server) {
		console.log(`server socket ${server}`)
	}

	handleConnection(client: Socket) {
		console.log(`client connect: ${client}`)
	}

	handleDisconnect(client: Socket) {
		console.log(`client disconnect ${client}`)
	}

	@SubscribeMessage('message')
	handleMessage(@MessageBody() message: string): void {
		console.log(`Message: ${message}`)
		this.server.emit('message', `Echo: ${message}`)
	}
}
