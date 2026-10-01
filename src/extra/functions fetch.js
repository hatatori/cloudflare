async function getUsers() {
  const response = await fetch("/users");

  if (!response.ok) {
    throw new Error(`Erro: ${response.status}`);
  }

  const users = await response.json();

  console.log(users);
}

async function createUser() {
  const response = await fetch("/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "Renata oliveira",
      email: "renataoliveira@email.com"
    })
  });

  const data = await response.json();

  console.log(data);
}

// substitui tudo
async function updateUser(id) {
  const response = await fetch(`/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "João Santos",
      email: "joao.santos@email.com"
    })
  });

  const data = await response.json();

  console.log(data);
}

// apenas 1 campo
async function updateUserName(id) {
  const response = await fetch(`/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: "João Santos"
    })
  });

  const data = await response.json();

  console.log(data);
}

async function deleteUser(id) {
  const response = await fetch(`/users/${id}`, {
    method: "DELETE"
  });

  const data = await response.json();

  console.log(data);
}

// deleteUser(1);
// updateUser(1);
// updateUserName(1)
// getUsers();
// createUser();

