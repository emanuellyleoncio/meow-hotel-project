import { PartialType } from '@nestjs/mapped-types'
import CreateUserDto from './create-users'

export default class UpdateUserDto extends PartialType(CreateUserDto) {}
