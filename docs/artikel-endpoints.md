# Artikel API Endpoints

## Artikel CRUD Operations

### Create Article

```bash
curl -X POST http://localhost:3000/artikel \
  -H "Content-Type: application/json" \
  -d '{"markdownText": "# My First Article\n\nThis is a **markdown** article.", "userId": 1}'
```

### Get All Articles

```bash
curl -X GET http://localhost:3000/artikel
```

### Get Article by ID

```bash
curl -X GET http://localhost:3000/artikel/1
```

### Update Article

```bash
curl -X PUT http://localhost:3000/artikel/1 \
  -H "Content-Type: application/json" \
  -d '{"markdownText": "# Updated Article\n\nThis article has been updated.", "isActive": true}'
```

### Delete Article

```bash
curl -X DELETE http://localhost:3000/artikel/1
```

## Quick Reference

| Method | Endpoint        | Protection | Description           |
| ------ | --------------- | ---------- | --------------------- |
| POST   | /artikel        | ❌         | Create new article    |
| GET    | /artikel        | ❌         | Get all articles      |
| GET    | /artikel/:id    | ❌         | Get article by ID     |
| PUT    | /artikel/:id    | ❌         | Update article        |
| DELETE | /artikel/:id    | ❌         | Delete article        |

## Article Schema

```json
{
  "id": 1,
  "markdownText": "# Article Title\n\nContent here...",
  "markdownTextDe": "# Artikel Titel\n\nInhalt...",
  "markdownTextEn": "# Article Title\n\nContent here...",
  "markdownTextFr": "# Titre de l'article\n\nContenu...",
  "markdownTextIt": "# Titolo dell'articolo\n\nContenuto...",
  "userId": 1,
  "isActive": true,
  "createdAt": "2026-01-13T10:00:00.000Z",
  "updatedAt": "2026-01-13T10:00:00.000Z",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```
