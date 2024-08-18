import {
    IsNotEmpty,
    IsStrongPassword,
    MaxLength,
} from 'class-validator'

export class SignInUserDto {
    
    @IsNotEmpty()
    @MaxLength(50)
    username: string

    @IsStrongPassword()
    password: string

}