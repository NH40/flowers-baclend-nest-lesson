import { IsNumber, IsString } from 'class-validator'

export class CreateFlowersDto {
	@IsString({
		message: 'Имя не строка',
	})
	name: string

	@IsString()
	color: string

	@IsNumber()
	price: number
}

export type TUpdateFlowerDto = Partial<CreateFlowersDto>
