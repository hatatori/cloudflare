export default {
  async fetch(request) {
    return new Response("Olá, Cloudflare!", {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  },
};