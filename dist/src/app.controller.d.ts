import { AppService } from './app.service';
import { PrismaService } from './prisma.service';
export declare class AppController {
    private readonly appService;
    private readonly prisma;
    constructor(appService: AppService, prisma: PrismaService);
    getHello(): string;
    getUsers(): Promise<{
        id: number;
        email: string;
        name: string;
        role: string;
        password: string;
        createdAt: Date;
    }[]>;
}
