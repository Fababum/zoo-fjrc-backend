import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  const mockAppService = {
    findAllUsers: jest.fn().mockResolvedValue([]),
    findUserById: jest.fn().mockResolvedValue(null),
    createUser: jest.fn().mockImplementation((dto) => Promise.resolve({ id: 1, ...dto, createdAt: new Date() })),
    updateUser: jest.fn().mockImplementation((id, dto) => Promise.resolve({ id, ...dto })),
    deleteUser: jest.fn().mockResolvedValue({ id: 1 }),
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
      expect(result).toEqual([]);
      expect(appService.findAllUsers).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      const result = await appController.findOne(1);
      expect(result).toBeNull();
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
      expect(result).toMatchObject({ id: 1, ...createUserDto });
      expect(appService.createUser).toHaveBeenCalledWith(createUserDto);
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const updateUserDto: UpdateUserDto = {
        name: 'Updated User',
      };
      const result = await appController.update(1, updateUserDto);
      expect(result).toMatchObject({ id: 1, ...updateUserDto });
      expect(appService.updateUser).toHaveBeenCalledWith(1, updateUserDto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const result = await appController.remove(1);
      expect(result).toMatchObject({ id: 1 });
      expect(appService.deleteUser).toHaveBeenCalledWith(1);
    });
  });
});
