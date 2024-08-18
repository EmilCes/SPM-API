import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CoreService } from 'src/core/core.service';

@Injectable()
export class UsersService {

  constructor (
    private prisma: PrismaService,
    private coreService: CoreService
  ) {}

  async create(createUserDto: CreateUserDto) {

    const existingUser = await this.prisma.user.findUnique({ where: { email: createUserDto.email } })

    if(existingUser)
      throw new ConflictException('Email is already in use');

    const hashedPassword = await this.coreService.hashPassword(createUserDto.password);
    const newUser = await this.prisma.user.create({ data: {
      ...createUserDto,
      password: hashedPassword
    }});

    const {password, ...result} = newUser;

    return result;
  }

  async findAll() {
    return await this.prisma.user.findMany({
      select: {
        userId: true,
        username: true
      }
    });
    /*const users = this.prisma.user.findMany();

    const result = (await users).map((user) => ({
      userId: user.userId,
      username: user.username
    }));

    return result;*/
  }

  async findOne(id: string) {
    const userFound = await this.prisma.user.findUnique({ where: { userId: id } });

    if(!userFound)
      throw new NotFoundException(`User with id $(id) not found`);

    const {password, createdAt, updatedAt, ...result} = userFound;

    return result;

  }

  async findOneByUsername(username: string) {
    const userFound = await this.prisma.user.findUnique({ where: { username: username } });

    if(!userFound)
      throw new NotFoundException(`User with username ${username} not found`);

    return userFound;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const userFound = await this.prisma.user.findUnique({ where: { userId: id } });

    if(!userFound)
      throw new NotFoundException(`User with id $(id) not found`);

    let hashedPassword = userFound.password;
    if(updateUserDto.password)
      hashedPassword = await this.coreService.hashPassword(updateUserDto.password)

    const updatedUser = await this.prisma.user.update({
      where: { userId: id },
      data: {
        ...updateUserDto,
        password: hashedPassword
      }
    });

    const {password, ...result} = updatedUser;

    return result;
  }

  async remove(id: string) {
    await this.prisma.user.delete({ where: { userId: id } });
  }
}
