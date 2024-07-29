import {
	Body,
	Controller,
	Get,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common'
import { CreateFlowersDto } from './dto/flowers.dto'
import { FlowersService } from './flowers.service'

@Controller('flowers')
// @UseInterceptors(LoggingInterceptor)
export class FlowersController {
	constructor(private readonly flowersService: FlowersService) {}

	@Get()
	// @UseGuards(AuthGuard)
	findAll() {
		return this.flowersService.findAll()
	}

	@Post()
	@UsePipes(new ValidationPipe())
	// @UseGuards(AuthGuard)
	create(@Body() dto: CreateFlowersDto) {
		return this.flowersService.create(dto)
	}
}
