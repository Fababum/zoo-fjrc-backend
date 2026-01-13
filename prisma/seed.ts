import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import * as bcrypt from 'bcrypt';

const url = new URL(process.env.DATABASE_URL!);
const adapter = new PrismaMariaDb({
    host: url.hostname,
    port: parseInt(url.port),
    user: url.username,
    password: url.password,
    database: url.pathname.slice(1),
    connectionLimit: 5,
    acquireTimeout: 30000,
    connectTimeout: 10000,
});
const prisma = new PrismaClient({ adapter });

async function main() {
    const hashedPassword = await bcrypt.hash('admin123', 10);
    
    const user = await prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {
            password: hashedPassword,
        },
        create: {
            name: 'Admin User',
            email: 'admin@example.com',
            role: 'admin',
            password: hashedPassword,
        },
    });

    console.log('Seeded admin user:', user.email);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
