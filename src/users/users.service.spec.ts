import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { NotFoundException } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { CoreService } from 'src/core/core.service';
import { JwtService } from '@nestjs/jwt';

describe('UsersService', () => {
  let userService: UsersService;
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeEach(async () => {

    prismaMock = mockDeep<PrismaClient>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthService,
        CoreService,
        JwtService,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
  });

  describe('findOne', () => {
    it('it shoult return user if exists', async () => {
      const existingUser = {
        userId: "clztakb2v0000wv81gj9wmqro",
        username: "Juanito23",
        name: "Juan",
        lastname: "López",
        email: "emilianolezama@outlook.com",
        password: "contras3ñ1S2cewo??",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const { createdAt, updatedAt, password, ...expectedUser } = existingUser;

      prismaMock.user.findUnique.mockResolvedValue(existingUser);

      const result = await userService.findOne("clztakb2v0000wv81gj9wmqro");
      expect(result).toEqual(expectedUser);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { userId: existingUser.userId },
      });
    });

    it('should throw NotFoundException if user not exists', async () => {
      prismaMock.user.findUnique.mockResolvedValue(null);

      await expect(
        userService.findOne('non-existing-username'),
      ).rejects.toThrow(NotFoundException);
      expect(prismaMock.user.findUnique).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findUnique).toHaveBeenCalledWith({
        where: { userId: 'non-existing-username' },
      });
    });
  })

  describe('findAll', () => {
    it('should return all user', async () => {
      const allUsers = [
        {
          userId: "clztakb2v0000wv81gj9wmqro",
          username: "Juanito23",
          name: "Juan",
          lastname: "López",
          email: "emilianolezama@outlook.com",
          password: "contras3ñ1S2cewo??",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          userId: "clztak1fc0000wv81gj9wmqrb",
          username: "Chavo1000",
          name: "Chavo",
          lastname: "López",
          email: "elChavo@gmail.com",
          password: "codews3dw23S4?12cewo??",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ];

      const expectedUsers = allUsers.map(user => ({
        userId: user.userId,
        username: user.username
      }));

      prismaMock.user.findMany.mockResolvedValue(allUsers);

      const response = await userService.findAll();

      const result = response.map(user => ({
        userId: user.userId,
        username: user.username
      }))

      expect(result).toEqual(expectedUsers);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        select: { userId: true, username: true }
      });
    });

    it('should return empty array if there are no users', async () => {
      prismaMock.user.findMany.mockResolvedValue([]);

      const result = await userService.findAll();
      expect(result).toEqual([]);
      expect(prismaMock.user.findMany).toHaveBeenCalledTimes(1);
      expect(prismaMock.user.findMany).toHaveBeenCalledWith({
        select: { userId: true, username: true }
      });
    });
  });

});
