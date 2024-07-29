import { ConfigService } from '@nestjs/config'
import { Test } from '@nestjs/testing'
import { PrismaService } from '../../prisma.service'
import { FlowersService } from '../flowers.service'

describe('FlowersService', () => {
	let service: FlowersService

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			providers: [
				FlowersService,
				{
					provide: PrismaService,
					useValue: {
						flower: {
							findMany: jest.fn().mockResolvedValue([
								{
									id: 1,
									name: 'роза',
									color: 'red',
									price: 120,
								},
							]),
							create: jest.fn().mockResolvedValue({
								id: 2,
								name: 'Лилия',
								color: 'White',
								price: 110,
							}),
						},
					},
				},
				{
					provide: ConfigService,
					useValue: {},
				},
			],
		}).compile()

		service = module.get<FlowersService>(FlowersService)
	})

	it('should return an array of flowers', async () => {
		expect(await service.findAll()).toEqual([
			{
				id: 1,
				name: 'роза',
				color: 'red',
				price: 120,
			},
		])
	})

	it('should create a new flower', async () => {
		expect(
			await service.create({
				name: 'Лилия',
				color: 'White',
				price: 110,
			})
		).toEqual({
			id: 2,
			name: 'Лилия',
			color: 'White',
			price: 110,
		})
	})
})
