import { ApolloDriver } from '@nestjs/apollo/dist/drivers/apollo.driver'
import { ApolloDriverConfig } from '@nestjs/apollo/dist/interfaces/apollo-driver-config.interface'
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { GraphQLModule } from '@nestjs/graphql/dist/graphql.module'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { join } from 'path'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LoggerMiddleware } from './conception/middleware'
import { microserviceConstant } from './constant/microservice.constant'
import { FlowersGraphqlModule } from './flowers-graphql/flowers-graphql.module'
import { FlowersModule } from './flowers/flowers.module'
import { MicroserviceModule } from './microservice/microservice.module'
import { WebSocket } from './websocket/websocket.gateway'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		FlowersModule,
		MicroserviceModule,
		ClientsModule.register([
			{
				name: 'ORDER_SERVICE',
				transport: Transport.TCP,
				options: microserviceConstant,
			},
		]),
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
			sortSchema: true,
		}),
		FlowersGraphqlModule,
	],
	controllers: [AppController],
	providers: [AppService, WebSocket],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes('flowers')
	}
}
