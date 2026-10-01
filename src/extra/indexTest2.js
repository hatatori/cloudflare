export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/") {
      return new Response("Olá, Cloudflare!");
    }

    if (url.pathname === "/health") {
      return Response.json({ ok: true });
    }

    return new Response("Not Found", {
      status: 404,
    });
  },
};