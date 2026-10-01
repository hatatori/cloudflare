export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const { pathname } = url;
    const method = request.method;

    // GET /users
    if (method === "GET" && pathname === "/users") {
      const { results } = await env.DB
        .prepare("SELECT * FROM users ORDER BY id DESC")
        .all();

      return Response.json(results);
    }

    // GET /users/:id
    if (method === "GET" && pathname.startsWith("/users/")) {
      const id = pathname.split("/")[2];

      const user = await env.DB
        .prepare("SELECT * FROM users WHERE id = ?")
        .bind(id)
        .first();

      if (!user) {
        return Response.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return Response.json(user);
    }

    // POST /users
    if (method === "POST" && pathname === "/users") {
      let body;

      try {
        body = await request.json();
      } catch {
        return Response.json(
          { error: "Invalid JSON body" },
          { status: 400 }
        );
      }

      if (!body.name || !body.email) {
        return Response.json(
          { error: "name and email are required" },
          { status: 400 }
        );
      }

      const result = await env.DB
        .prepare(
          "INSERT INTO users (name, email) VALUES (?, ?)"
        )
        .bind(body.name, body.email)
        .run();

      return Response.json(
        {
          id: result.meta.last_row_id,
          name: body.name,
          email: body.email
        },
        { status: 201 }
      );
    }

    // PUT /users/:id
    if (method === "PUT" && pathname.startsWith("/users/")) {
      const id = pathname.split("/")[2];

      let body;

      try {
        body = await request.json();
      } catch {
        return Response.json(
          { error: "Invalid JSON body" },
          { status: 400 }
        );
      }

      if (!body.name || !body.email) {
        return Response.json(
          { error: "name and email are required" },
          { status: 400 }
        );
      }

      const result = await env.DB
        .prepare(
          "UPDATE users SET name = ?, email = ? WHERE id = ?"
        )
        .bind(body.name, body.email, id)
        .run();

      if (result.meta.changes === 0) {
        return Response.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return Response.json({
        id,
        name: body.name,
        email: body.email
      });
    }

    // DELETE /users/:id
    if (method === "DELETE" && pathname.startsWith("/users/")) {
      const id = pathname.split("/")[2];

      const result = await env.DB
        .prepare("DELETE FROM users WHERE id = ?")
        .bind(id)
        .run();

      if (result.meta.changes === 0) {
        return Response.json(
          { error: "User not found" },
          { status: 404 }
        );
      }

      return Response.json({
        message: "User deleted"
      });
    }

    return Response.json(
      { error: "Not found" },
      { status: 404 }
    );
  }
};