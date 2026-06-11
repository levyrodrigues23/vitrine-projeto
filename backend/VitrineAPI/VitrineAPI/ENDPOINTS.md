# API Endpoints - Vitrine de Projetos

**Base URL:** `http://localhost:5026/api`

---

## Endpoints

### 1. Listar Projetos
```
GET /projects
```

**Response:** `200 OK`
```json
[
  {
	"id": "uuid",
	"title": "string",
	"category": "Inovação | Extensão | Pesquisa",
	"description": "string",
	"imageUrl": "string"
  }
]
```

---

### 2. Obter Projeto
```
GET /projects/{id}
```

**Response:** `200 OK` | `404 Not Found`
```json
{
  "id": "uuid",
  "title": "string",
  "category": "Inovação | Extensão | Pesquisa",
  "description": "string",
  "imageUrl": "string"
}
```

---

### 3. Criar Projeto
```
POST /projects
Content-Type: application/json
```

**Body:**
```json
{
  "title": "string (até 50 caracteres)",
  "category": "Inovação | Extensão | Pesquisa",
  "description": "string (até 300 caracteres)",
  "imageUrl": "string (URL válida)"
}
```

**Response:** `201 Created`
```json
{
  "id": "uuid",
  "title": "string",
  "category": "Inovação | Extensão | Pesquisa",
  "description": "string",
  "imageUrl": "string"
}
```

**Erros:** `400 Bad Request`
```json
{
  "Title": ["Title is required" | "Title must be at most 50 characters"],
  "Category": ["Category is required" | "Invalid category. Valid values: Inovação, Extensão, Pesquisa"],
  "Description": ["Description is required" | "Description must be at most 300 characters"]
}
```

---

### 4. Atualizar Projeto
```
PUT /projects/{id}
Content-Type: application/json
```

**Body:** (mesmo do POST)
```json
{
  "title": "string",
  "category": "Inovação | Extensão | Pesquisa",
  "description": "string",
  "imageUrl": "string"
}
```

**Response:** `200 OK` | `404 Not Found`
```json
{
  "id": "uuid",
  "title": "string",
  "category": "Inovação | Extensão | Pesquisa",
  "description": "string",
  "imageUrl": "string"
}
```

---

### 5. Deletar Projeto
```
DELETE /projects/{id}
```

**Response:** `204 No Content` | `404 Not Found`

---

### 6. Upload de Imagem
```
POST /projects/image
Content-Type: multipart/form-data
```

**Body:** `file` (multipart)
- Tamanho máx: 5MB
- Extensões: `.jpg`, `.jpeg`, `.png`, `.webp`

**Response:** `200 OK`
```json
{
  "url": "http://localhost:5026/uploads/projects/{filename}"
}
```

**Erros:** `400 Bad Request`
```json
{
  "error": "No file was sent."
}
```
```json
{
  "error": "File exceeds the 5MB limit."
}
```
```json
{
  "error": "Unsupported format. Allowed: .jpg, .jpeg, .png, .webp"
}
```

---

## Fluxo Padrão

```
1. POST /projects/image
   Retorna: { "url": "..." }

2. POST /projects
   ├─ title: "seu título"
   ├─ category: "Inovação"
   ├─ description: "sua descrição"
   └─ imageUrl: "url do step 1"
   Retorna: { "id": "uuid", ... }
```

---

## Status Codes

| Código | Significado |
|--------|------------|
| `200` | OK |
| `201` | Created |
| `204` | No Content |
| `400` | Bad Request (validação) |
| `404` | Not Found |
| `500` | Server Error |

---

## Validações

| Campo | Regra |
|-------|-------|
| `title` | até 50 caracteres, obrigatório |
| `category` | "Inovação" \| "Extensão" \| "Pesquisa", obrigatório |
| `description` | até 300 caracteres, obrigatório |
| `file` (upload) | 5MB máx, extensões: jpg/jpeg/png/webp |

---

## CORS

- Origem permitida: `http://localhost:5173`

---

## Notas

- UUIDs são gerados automaticamente no POST
- Enums retornam como string: `"Inovação"` (não `0`)
- Upload salva em `wwwroot/uploads/projects/`
- DELETE é permanente
