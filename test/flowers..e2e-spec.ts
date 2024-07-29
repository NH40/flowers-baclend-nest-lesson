import { INestApplication, ValidationPipe } from '@nestjs/common'
import { Test, TestingModule } from '@nestjs/testing'
import * as request from 'supertest'
import { AppModule } from '../src/app.module'

describe('FlowersController (e2e)', () => {
	let app: INestApplication

	beforeAll(async () => {
		const moduleMixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile()

		app = moduleMixture.createNestApplication()
		app.useGlobalPipes(new ValidationPipe())
		await app.init()
	})

	it('/flowers (GET)', () => {
		return request(app.getHttpServer())
			.get('/flowers')
			.expect(200)
			.expect([
				{
					id: 1,
					name: 'роза',
					color: 'red',
					price: 120,
					createdAd: '2024-07-28T08:11:41.178Z',
					updateAd: '2024-07-28T08:11:41.178Z',
				},
				{
					id: 2,
					name: 'Лилия',
					color: 'White',
					price: 110,
					createdAd: '2024-07-28T08:12:19.787Z',
					updateAd: '2024-07-28T08:12:19.787Z',
				},
				{
					id: 3,
					name: 'Ромашка',
					color: 'Yellow',
					price: 80,
					createdAd: '2024-07-28T08:12:38.936Z',
					updateAd: '2024-07-28T08:12:38.936Z',
				},
				{
					id: 4,
					name: 'Ромашка',
					color: 'Yellow',
					price: 80,
					createdAd: '2024-07-29T09:13:22.438Z',
					updateAd: '2024-07-29T09:13:22.438Z',
				},
				{
					id: 5,
					name: 'Sunflower',
					color: 'Yellow',
					price: 80,
					createdAd: '2024-07-29T14:36:16.639Z',
					updateAd: '2024-07-29T14:36:16.639Z',
				},
				{
					id: 6,
					name: 'Sunflower',
					color: 'Yellow',
					price: 80,
					createdAd: '2024-07-29T14:36:49.475Z',
					updateAd: '2024-07-29T14:36:49.475Z',
				},
				{
					id: 7,
					name: 'Sunflower',
					color: 'Yellow',
					price: 80,
					createdAd: '2024-07-29T14:37:27.728Z',
					updateAd: '2024-07-29T14:37:27.728Z',
				},
			])
	})

	it('/flowers (POST)', () => {
		return request(app.getHttpServer())
			.post('/flowers')
			.send({
				name: 'Sunflower',
				color: 'Yellow',
				price: 80,
			})
			.expect(201)
			.expect(response => {
				return response.body.name === 'Sunflower'
			})
	})

	afterAll(async () => {
		await app.close()
	})
})
