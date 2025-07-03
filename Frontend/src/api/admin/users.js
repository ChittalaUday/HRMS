export async function adminLogin({ email, password }) {
    const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function getAllUsers(token) {
    const res = await fetch("http://localhost:5000/api/admin/users", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function getUserById(id, token) {
    const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function createUser(user, token) {
    const res = await fetch("http://localhost:5000/api/admin/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function updateUser(id, user, token) {
    const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(user)
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function deleteUser(id, token) {
    const res = await fetch(`http://localhost:5000/api/admin/users/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function getRoles(token) {
    const res = await fetch("http://localhost:5000/api/admin/roles", {
        headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function updateRole(id, name, token) {
    const res = await fetch(`http://localhost:5000/api/admin/roles/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ id, name })
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function createRole(name, token) {
    const res = await fetch("http://localhost:5000/api/admin/roles", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name })
    });
    const data = await res.json();
    return { ok: res.ok, data };
}

export async function deleteRole(id, token) {
    const res = await fetch(`http://localhost:5000/api/admin/roles/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
    });
    const data = await res.json();
    return { ok: res.ok, data };
} 