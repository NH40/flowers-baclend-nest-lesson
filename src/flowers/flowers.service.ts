import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma.service'
import { CreateFlowersDto } from './dto/flowers.dto'

@Injectable()
export class FlowersService {
	constructor(private readonly prisma: PrismaService) {}
	findAll() {
		// console.log(this.configService.get<EnumAppMode>('MODE'))
		return this.prisma.flower.findMany()
	}
	create(dto: CreateFlowersDto) {
		return this.prisma.flower.create({
			data: dto,
		})
	}
}
