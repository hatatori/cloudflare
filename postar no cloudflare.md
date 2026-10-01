# Cloudflare

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

## Estrutura 
```
meu-servidor/
├── src/
│   └── index.js
└── wrangler.jsonc
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