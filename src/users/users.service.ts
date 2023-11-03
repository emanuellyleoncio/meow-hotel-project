import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/database/prisma.service'
import CreateUserDto from './dto/create-users'
import UpdateUserDto from './dto/update-users'

@Injectable()
export class UsersService {
	constructor(private readonly prisma: PrismaService) {}

	async findUserByEmail(email: string) {
		return await this.prisma.user.findFirst({ where: { email } })
	}

	async createUser(data: CreateUserDto) {
		return await this.prisma.user.create({ data })
	}

	async findAllUsers() {
		return await this.prisma.user.findMany()
	}

	async findUser(id: string) {
		return await this.prisma.user.findFirst({ where: { id } })
	}

	async updateUser(id: string, data: UpdateUserDto) {
		await this.prisma.user.update({
			where: {
				id
			},
			data
		})
	}
}
