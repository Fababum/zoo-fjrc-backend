# Start MariaDB

docker compose up -d

# Sync database schema

npx prisma db push

# Reset database (delete all data and recreate schema)

npx prisma db push --force-reset

# Seed dummy user

npx ts-node prisma/seed.ts

# Start app

npm run start:dev

# Test endpoint

curl http://localhost:3000/users
