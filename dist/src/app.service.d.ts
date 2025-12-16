import { PrismaService } from './prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class AppService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAllUsers(): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }[]>;
    findUserById(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }>;
    createUser(createUserDto: CreateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }>;
    updateUser(id: number, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }>;
    deleteUser(id: number): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
        createdAt: Date;
    }>;
}
