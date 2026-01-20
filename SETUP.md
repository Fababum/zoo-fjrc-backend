npm install

# Start MariaDB

docker compose up -d

npx prisma generate

npx prisma migrate deploy

# Sync database schema

npx prisma db push

# Seed dummy user

npx ts-node prisma/seed.ts

# Start app

npm run start:dev