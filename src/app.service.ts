import { Injectable } from '@nestjs/common'
import {
	ClientProxy,
	ClientProxyFactory,
	Transport,
} from '@nestjs/microservices'
import { microserviceConstant } from './constant/microservice.constant'

@Injectable()
export class AppService {
	private client: ClientProxy

	constructor() {
		this.client = ClientProxyFactory.create({
			transport: Transport.TCP,
			options: microserviceConstant,
		})
	}
	sendMessage() {
		this.client.emit('message', 'New order #23')
	}
}
