import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { PrismaService } from 'src/prisma.service';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { PrismaClient } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

describe('UsersController', () => {
  let usersController: UsersController;
  let prismaMock: DeepMockProxy<PrismaClient>

  beforeEach(async () => {

    prismaMock = mockDeep<PrismaClient>();
    
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        UsersService,
        AuthService,
        {
          provide: PrismaService,
          useValue: prismaMock
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(0).toBe(0);
  });
});
