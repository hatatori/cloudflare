# Cloudflare

## Estrutura 
```
meu-servidor/
├── src/
│   └── index.js
├── wrangler.jsonc
├── schema.sql
└── schemainsert.sql
```

## index.js
```js
export default {
  async fetch(request) {
    return new Response("Olá, Cloudflare!", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};
```

## wrangler.jsonc
```json
{
  "name": "meu-servidor",
  "main": "src/index.js",
  "compatibility_date": "2026-10-01"
}
```

## Startar
```
npm init -y
```

## Para testar localmente:
```
npm install -D wrangler
npx wrangler dev
```

## E para publicar:
```
npx wrangler deploy
```
# BANCO

## schema.sql
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);
```
## schemainsert.sql
```sql
INSERT INTO users (name, email) VALUES
('João Silva', 'joao.silva@email.com'),
('Maria Oliveira', 'maria.oliveira@email.com'),
('Carlos Santos', 'carlos.santos@email.com'),
('Ana Souza', 'ana.souza@email.com'),
('Pedro Costa', 'pedro.costa@email.com'),
('Juliana Lima', 'juliana.lima@email.com'),
('Lucas Pereira', 'lucas.pereira@email.com'),
('Fernanda Alves', 'fernanda.alves@email.com'),
('Rafael Rodrigues', 'rafael.rodrigues@email.com'),
('Camila Martins', 'camila.martins@email.com');
```


## Criar banco de dados
```
npx wrangler d1 create banco
```
## Executar
```
npx wrangler d1 execute banco --local --file=./schema.sql
npx wrangler d1 execute banco --remote --file=./schemainserts.sql

npx wrangler d1 execute banco --remote --file=./schema.sql
npx wrangler d1 execute banco --remote --file=./schemainserts.sql
```
## Excluir o banco
```
npx wrangler d1 delete banco

npx wrangler d1 delete banco --skip-confirmation
```
## Download do banco
```
npx wrangler d1 export banco --remote --output=backup.sql
```