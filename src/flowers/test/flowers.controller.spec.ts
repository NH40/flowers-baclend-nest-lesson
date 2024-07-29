import { Test } from '@nestjs/testing'
import { FlowersController } from '../flowers.controller'
import { FlowersService } from '../flowers.service'

describe('FlowersController', () => {
	let controller: FlowersController

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [FlowersController],
			providers: [
				{
					provide: FlowersService,
					useValue: {
						findAll: jest.fn().mockResolvedValue([
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
			],
		}).compile()

		controller = module.get<FlowersController>(FlowersController)
	})

	it('should return an array of flowers', async () => {
		expect(await controller.findAll()).toEqual([
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
			await controller.create({
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
