import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {

  constructor (
    private prisma: PrismaService,
    private authService: AuthService
  ) {}

  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } })

    if(existingUser)
      throw new ConflictException('Email is already in use');

    const hashedPassword = await this.authService.hashPassword(createUserDto.password);
    const newUser = await this.prisma.user.create({ data: {
      ...createUserDto,
      password: hashedPassword
    }});

    return newUser;
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string) {
    const userFound = await this.prisma.user.findUnique({ where: {userId: id} });

    if(!userFound)
      throw new NotFoundException(`User with id $(id) not found`);

    return userFound;

  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFound = await this.prisma.user.findUnique({ where: {userId: id} });

    if(!userFound)
      throw new NotFoundException(`User with id $(id) not found`);

    let hashedPassword = userFound.password;
    if(updateUserDto.password)
      hashedPassword = await this.authService.hashPassword(updateUserDto.password)

    const updatedUser = await this.prisma.user.update({
      where: { userId: id },
      data: {
        ...updateUserDto,
        password: hashedPassword
      }
    })

    return updatedUser;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { userId: id } });
  }
}
