import axios from "axios";

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ??
    "http://localhost/Note-App-PHP/backend",
});

export async function fetchNotes() {
  const response = await api.get("/note.php");
  return response.data;
}

export async function fetchNote(id) {
  const response = await api.get(`/note.php?id=${id}`);
  return response.data;
}

export async function createNote(payload) {
  const response = await api.post("/note.php", payload);
  return response.data;
}

export async function updateNote(id, payload) {
  const response = await api.put(`/note.php?id=${id}`, payload);
  return response.data;
}

export async function deleteNote(id) {
  const response = await api.delete(`/note.php?id=${id}`);
  return response.data;
}
