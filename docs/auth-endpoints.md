# API Endpoints

## Auth

### Register

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name": "John Doe", "email": "john@example.com", "password": "password123"}'
```

### Login

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@example.com", "password": "admin123"}'
```

## Users

### Get All Users

```bash
curl -X GET http://localhost:3000/users
```

### Get User by ID

```bash
curl -X GET http://localhost:3000/users/1
```

### Update User (Admin Only)

```bash
curl -X PUT http://localhost:3000/users/1 \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

### Delete User (Admin Only)

```bash
curl -X DELETE http://localhost:3000/users/1 \
  -H "Authorization: Bearer <token>"
```

## Quick Reference

| Method | Endpoint       | Auth | Admin |
| ------ | -------------- | ---- | ----- |
| POST   | /auth/register | ❌   | ❌    |
| POST   | /auth/login    | ❌   | ❌    |
| GET    | /users         | ❌   | ❌    |
| GET    | /users/:id     | ❌   | ❌    |
| PUT    | /users/:id     | ✅   | ✅    |
| DELETE | /users/:id     | ✅   | ✅    |

## Error Codes

| Code | Meaning      |
| ---- | ------------ |
| 400  | Bad Request  |
| 401  | Unauthorized |
| 403  | Forbidden    |
| 404  | Not Found    |
| 409  | Conflict     |
| 500  | Internal     |
