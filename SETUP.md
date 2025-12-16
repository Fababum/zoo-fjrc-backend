# Start MariaDB
docker compose up -d

# Sync database schema
npx prisma db push

# Seed dummy user
npx ts-node prisma/seed.ts

# Start app
npm run start:dev

# Test endpoint
curl http://localhost:3000/test