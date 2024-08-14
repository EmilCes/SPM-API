import {
    IsEmail,
    IsNotEmpty,
    IsStrongPassword,
    MaxLength,
} from 'class-validator'

export class CreateUserDto {
    
    @IsNotEmpty()
    @MaxLength(50)
    username: string

    @IsNotEmpty()
    @MaxLength(50)
    name: string

    @IsNotEmpty()
    @MaxLength(50)
    lastname: string
    
    @IsEmail()
    email: string

    @IsStrongPassword()
    password: string

}