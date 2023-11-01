import { IsEmail, IsNotEmpty } from 'class-validator'

export default class CreateUserDto {
	@IsEmail({}, { message: 'The field must have a valid email format.' })
	@IsNotEmpty({ message: 'The field must be informed.' })
	email: string

	phone: string

	@IsNotEmpty({ message: 'The field must be informed.' })
	role: Role
}

enum Role {
	TUTOR = 'TUTOR',
	HOST = 'HOST'
}
