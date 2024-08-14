import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsStrongPassword,
    MaxLength,
} from 'class-validator'

export class UpdateUserDto {
    
    @IsOptional()
    @IsString()
    @MaxLength(50)
    username?: string

    @IsOptional()
    @IsString()
    @MaxLength(50)
    name?: string

    @IsOptional()
    @IsString()
    @MaxLength(50)
    lastname?: string
    
    @IsOptional()
    @IsString()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    @IsStrongPassword()
    password?: string

  //projects Project[] @relation("UserProjects")  
}