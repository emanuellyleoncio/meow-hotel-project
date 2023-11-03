import {
	BadRequestException,
	Body,
	Controller,
	Get,
	HttpStatus,
	NotFoundException,
	Param,
	Post,
	Put,
	Res
} from '@nestjs/common'
import { UsersService } from './users.service'
import CreateUserDto from './dto/create-users'
import { Response } from 'express'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	async createUser(@Body() data: CreateUserDto, @Res() res: Response) {
		const userExists = await this.usersService.findUserByEmail(data.email)

		if (userExists) {
			throw new BadRequestException('Already exists a user with this email!')
		}

		const user = await this.usersService.createUser(data)

		return res.status(HttpStatus.CREATED).json(user)
	}

	@Get()
	async getUsers(@Res() res: Response) {
		const users = await this.usersService.findAllUsers()
		return res.json(users)
	}

	@Get(':id')
	async getUser(@Param('id') id: string, @Res() res: Response) {
		const user = await this.usersService.findUser(id)

		if (!user) {
			throw new NotFoundException('User does not exist!')
		}

		return res.json(user)
	}

	@Put(':id')
	async updateUser(
		@Param('id') id: string,
		@Body() data: CreateUserDto,
		@Res() res: Response
	) {
		const findUser = await this.usersService.findUser(id)

		if (!findUser) {
			throw new NotFoundException('User does not exist!')
		}

		await this.usersService.updateUser(id, { ...findUser, ...data })

		return res.status(HttpStatus.NO_CONTENT).send()
	}
}
