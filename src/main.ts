import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'
import { AppModule } from './app.module'
import { microserviceConstant } from './constant/microservice.constant'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')
	await app.listen(4200)
	console.log('HTTP PORT 4200')

	const microserviceApp =
		await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
			transport: Transport.TCP,
			options: microserviceConstant,
		})
	await microserviceApp.listen()
	console.log('microservice 8877')
}
bootstrap()
