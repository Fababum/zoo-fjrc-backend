import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
    role: 'user',
    createdAt: new Date(),
  };

  const mockAppService = {
    findAllUsers: jest.fn().mockResolvedValue([mockUser]),
    findUserById: jest.fn().mockResolvedValue(mockUser),
    createUser: jest.fn().mockResolvedValue(mockUser),
    updateUser: jest.fn().mockResolvedValue(mockUser),
    deleteUser: jest.fn().mockResolvedValue(mockUser),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: mockAppService,
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const result = await appController.findAll();
      expect(result).toEqual([mockUser]);
      expect(appService.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await appController.findOne(1);
      expect(result).toEqual(mockUser);
      expect(appService.findUserById).toHaveBeenCalledWith(1);
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto: CreateUserDto = {
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
      };
      const result = await appController.create(createUserDto);
      expect(result).toEqual(mockUser);
      expect(appService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };
      const result = await appController.update(1, updateUserDto);
      expect(result).toEqual(mockUser);
      expect(appService.updateUser).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await appController.remove(1);
      expect(result).toEqual(mockUser);
      expect(appService.deleteUser).toHaveBeenCalledWith(1);
    });
  });
});
